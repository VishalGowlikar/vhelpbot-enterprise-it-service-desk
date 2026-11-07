
import os
from pathlib import Path

import chromadb
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load environment variables
load_dotenv()

# Initialize Gemini
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing from the .env file")

client = genai.Client(api_key=api_key)

# Define knowledge-base directories
APP_DIR = Path(__file__).resolve().parents[1]

DOCUMENTS_DIR = APP_DIR / "knowledge_base" / "documents"
DATABASE_DIR = APP_DIR / "knowledge_base" / "chroma_db"

# Initialize persistent ChromaDB
chroma_client = chromadb.PersistentClient(path=str(DATABASE_DIR))

collection = chroma_client.get_or_create_collection(
    name="it_support_documents",
    metadata={"hnsw:space": "cosine"}
)


def create_chunks(text: str, chunk_size: int = 1000, overlap: int = 150):
    """Split document text into overlapping chunks."""

    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end].strip()

        if chunk:
            chunks.append(chunk)

        start += chunk_size - overlap

    return chunks


def generate_embedding(text: str, task_type: str):
    """Generate a Gemini embedding for text."""

    response = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text,
        config=types.EmbedContentConfig(
            task_type=task_type
        )
    )

    return response.embeddings[0].values


def index_documents():
    """Read, chunk, embed, and store IT support documents."""

    if not DOCUMENTS_DIR.exists():
        raise FileNotFoundError(
            f"Documents directory not found: {DOCUMENTS_DIR}"
        )

    document_files = list(DOCUMENTS_DIR.glob("*.txt"))

    if not document_files:
        raise ValueError("No .txt documents found in the knowledge base.")

    total_chunks = 0

    for file_path in document_files:
        text = file_path.read_text(encoding="utf-8")
        chunks = create_chunks(text)

        for index, chunk in enumerate(chunks):
            embedding = generate_embedding(
                chunk,
                task_type="RETRIEVAL_DOCUMENT"
            )

            chunk_id = f"{file_path.stem}_{index}"

            collection.upsert(
                ids=[chunk_id],
                documents=[chunk],
                embeddings=[embedding],
                metadatas=[{
                    "source": file_path.name,
                    "chunk_index": index
                }]
            )

            total_chunks += 1

        print(f"Indexed: {file_path.name} ({len(chunks)} chunks)")

    print(f"Knowledge-base indexing complete. Total chunks: {total_chunks}")

    return total_chunks

def search_knowledge_base(question: str, top_k: int = 3):
    """Find the most relevant IT support document chunks."""

    # Convert the employee's question into an embedding
    query_embedding = generate_embedding(
        question,
        task_type="RETRIEVAL_QUERY"
    )

    # Search ChromaDB for similar document chunks
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=min(top_k, collection.count()),
        include=["documents", "metadatas", "distances"]
    )

    retrieved_documents = []

    if results["documents"]:
        for document, metadata, distance in zip(
            results["documents"][0],
            results["metadatas"][0],
            results["distances"][0]
        ):
            retrieved_documents.append({
                "content": document,
                "source": metadata["source"],
                "distance": distance
            })

    return retrieved_documents
