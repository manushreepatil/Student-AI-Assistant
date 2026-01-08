from supabase import create_client
import os
from fastapi import FastAPI
from pydantic import BaseModel
from graph import graph_app
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
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

@app.post("/chat")
def chat(request: ChatRequest):
    reply = graph_app.invoke({"message": request.message})

    # Save to Supabase
    supabase.table("chat_logs").insert({
        "user_message": request.message,
        "ai_reply": reply
    }).execute()

    return {"reply": reply}
