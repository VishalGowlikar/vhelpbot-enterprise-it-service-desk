# 🚀 VHelpbot – Enterprise AI IT Service Desk Assistant

An AI-powered IT support assistant built with **Google Gemini, Retrieval-Augmented Generation (RAG), ChromaDB, FastAPI, React, TypeScript, and Vite**.

VHelpbot helps employees troubleshoot common enterprise IT issues, including Windows performance problems, Microsoft Outlook synchronization, and VPN connectivity.

The project was built to explore how LLMs, embeddings, vector databases, backend APIs, and frontend applications work together in a practical Generative AI application.

---

## 🎯 Project Objectives

- Build an AI-powered IT support chatbot.
- Integrate Google's Gemini API for natural-language generation.
- Implement a RAG pipeline to retrieve relevant information from IT documentation.
- Store and search document embeddings using ChromaDB.
- Develop REST APIs using Python and FastAPI.
- Build an interactive chat interface using React and TypeScript.
- Organize and maintain the source code using Git and GitHub.

## ✨ Features

- **AI-powered responses:** Uses Google Gemini to generate natural-language answers.
- **Retrieval-Augmented Generation:** Retrieves relevant information from internal IT support documents before generating responses.
- **Semantic search:** Finds relevant document content using embeddings.
- **Vector storage:** Uses ChromaDB to store and retrieve document embeddings.
- **Interactive chat interface:** Provides a conversational user experience.
- **Markdown rendering:** Displays structured AI responses.
- **Loading and error states:** Provides feedback during API requests.
- **Automatic scrolling:** Keeps the latest conversation visible.
- **Knowledge-base integration:** Supports Windows, Outlook, and VPN troubleshooting documents.

## 🏗️ Architecture

```text
                   USER
                    |
                    v
          React + TypeScript + Vite
               Frontend
                    |
                    | HTTP POST /chat
                    v
              FastAPI Backend
                    |
                    v
              RAG Pipeline
                    |
          +---------+----------+
          |                    |
          v                    v
     User Question       ChromaDB Search
          |                    |
          |              Relevant Documents
          |                    |
          +---------+----------+
                    |
                    v
             Retrieved Context
                    |
                    v
              Google Gemini
                    |
                    v
            Generated Response
                    |
                    v
             React Chat UI
                    |
                    v
                  USER
```

## 🧠 How the RAG Pipeline Works

VHelpbot uses Retrieval-Augmented Generation to provide answers based on its IT support knowledge base.

**Document ingestion workflow:**

1. Load IT troubleshooting documents.
2. Split documents into smaller text chunks.
3. Apply overlapping chunks to preserve context.
4. Generate embeddings using Google's `gemini-embedding-001` model.
5. Store embeddings, document text, and metadata in ChromaDB.

**Question-answering workflow:**

1. The user submits a question through the chat interface.
2. FastAPI receives the question.
3. The question is converted into an embedding.
4. ChromaDB performs similarity-based retrieval.
5. The most relevant document chunks are retrieved.
6. Retrieved context is passed to Gemini.
7. Gemini generates a response using the provided context.
8. The response is returned to the frontend.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Programming Language | Python 3.11 |
| LLM | Google Gemini API |
| Embedding Model | gemini-embedding-001 |
| AI Architecture | Retrieval-Augmented Generation (RAG) |
| Vector Database | ChromaDB |
| Backend | FastAPI |
| API Server | Uvicorn |
| Frontend | React, TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Version Control | Git, GitHub |

## 📂 Project Structure

```text
enterprise-it-service-desk-agent/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── services/
│   │   │   ├── llm_service.py
│   │   │   └── rag_service.py
│   │   │
│   │   └── knowledge_base/
│   │       ├── documents/
│   │       │   ├── windows_troubleshooting.txt
│   │       │   ├── outlook_support.txt
│   │       │   └── vpn_support.txt
│   │       │
│   │       └── chroma_db/
│   │
│   ├── inside_knowledge.py
│   ├── requirements.txt
│   ├── test_gemini.py
│   ├── test_rag.py
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

*Note: `.env`, virtual environments, `node_modules`, and generated ChromaDB data should not be committed to GitHub.*

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the project:

- Python 3.11
- Node.js and npm
- Git
- Google Gemini API key
- VS Code (recommended)

### 1. Clone the repository

```bash
git clone https://github.com/VishalGowlikar/vhelpbot-enterprise-it-service-desk.git

cd vhelpbot-enterprise-it-service-desk
```

### 2. Configure the backend

Navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python3 -m venv .venv
```

Activate the environment on macOS/Linux:

```bash
source .venv/bin/activate
```

On Windows:

```bash
.venv\Scripts\activate
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure the Gemini API key

Create a `.env` file inside the `backend` directory.

Add your own Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get an API key from:

https://aistudio.google.com/apikey

**Important:** Never upload your actual API key to GitHub. Keep `.env` excluded through `.gitignore`.

### 4. Build the knowledge base

From the `backend` directory, activate your virtual environment and execute:

```bash
python inside_knowledge.py
```

This processes the IT support documents, generates embeddings, and stores them in ChromaDB.

Run this step whenever you add or update knowledge-base documents.

### 5. Start the backend server

From the `backend` directory:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

FastAPI interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

### 6. Configure and start the frontend

Open a second terminal window.

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

Keep both backend and frontend servers running while using the application.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend welcome endpoint |
| GET | `/health` | Health check |
| POST | `/chat` | Submit a question and receive an AI response |

### Example Chat Request

```json
{
  "message": "How do I troubleshoot VPN connectivity issues?"
}
```

### Example Response

```json
{
  "answer": "Follow the recommended VPN troubleshooting steps..."
}
```

The actual response depends on the retrieved knowledge-base content and Gemini's generated answer.

## 🧪 Example Questions to Test

Try asking VHelpbot:

1. How do I troubleshoot Windows performance issues?
2. What should I do if Outlook is not synchronizing emails?
3. How can I troubleshoot VPN connectivity problems?
4. What should I check if my VPN connection keeps disconnecting?
5. How can I resolve Outlook sign-in issues?

## 🔐 Security Considerations

- Store API keys in environment variables.
- Do not commit `.env` files or credentials.
- Do not request users' passwords or MFA codes.
- Avoid exposing sensitive enterprise information in prompts or logs.
- Use authentication and authorization before deploying for enterprise use.

## 🚧 Roadmap – What's Next?

The next development phase focuses on Docker and deployment readiness.

- [ ] Create a Dockerfile for the backend.
- [ ] Create a Dockerfile for the frontend.
- [ ] Configure Docker Compose.
- [ ] Containerize application services and dependencies.
- [ ] Configure persistent storage for ChromaDB.
- [ ] Build and test Docker images.
- [ ] Publish images to Docker Hub.
- [ ] Improve RAG relevance scoring and unknown-question handling.
- [ ] Add source references to generated answers.
- [ ] Introduce conversation memory.
- [ ] Explore AI agent workflows and IT ticketing integration.
- [ ] Add authentication, monitoring, and deployment configuration.

## 🤝 Contributions and Collaboration

I welcome feedback, suggestions, bug reports, and open-source contributions.

If you are interested in Generative AI, RAG, Python, FastAPI, React, vector databases, or Docker, feel free to explore the repository and collaborate.

You can contribute by:

1. Forking the repository.
2. Creating a feature branch.
3. Making your improvements.
4. Submitting a pull request.

## 👨‍💻 Developer

**Vishal Gowlikar**

Machine Learning | Generative AI | Python | AI Application Development

- GitHub: https://github.com/VishalGowlikar
- LinkedIn: https://linkedin.com/in/vishal-gowlikar-235b20204

---

**Built as a hands-on learning project to understand and implement an end-to-end Generative AI application.**

*Learning, building, debugging, and improving — one step at a time.*
