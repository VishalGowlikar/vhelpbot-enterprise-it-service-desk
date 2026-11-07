
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

from app.services.llm_service import generate_it_support_response

app = FastAPI(
    title="VHelpbot - Enterprise AI IT Service Desk",
    description="An AI-powered enterprise IT support assistant",
    version="1.0.0"
)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)


class ChatResponse(BaseModel):
    answer: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to VHelpbot AI IT Service Desk"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "application": "VHelpbot"
    }


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        answer = generate_it_support_response(request.message)

        return ChatResponse(answer=answer)

    except Exception as error:
        print(f"Gemini API error: {type(error).__name__}: {error}")

        raise HTTPException(
            status_code=502,
            detail="VHelpbot could not generate a response. Please try again."
        ) from error
