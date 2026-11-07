from app.services.rag_service import index_documents

if __name__ == "__main__":
    print("Starting VHelpbot knowledge-base indexing...")

    try:
        total_chunks = index_documents()
        print(f"Successfully indexed {total_chunks} document chunks.")

    except Exception as error:
        print(f"Indexing failed: {type(error).__name__}: {error}")