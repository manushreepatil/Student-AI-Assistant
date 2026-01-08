from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from graph import graph_app

app = FastAPI(
    title="Student AI Backend",
    docs_url="/docs"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"status": "Backend is live"}

@app.post("/chat")
def chat(request: ChatRequest):
    result = graph_app.invoke({"message": request.message})

    # FORCE string output
    if isinstance(result, dict):
        reply = result.get("reply") or str(result)
    else:
        reply = str(result)

    return {"reply": reply}

