from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from prompts import SYSTEM_PROMPT

load_dotenv()

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.4
)

def generate_reply(user_message: str) -> str:
    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(content=user_message),
    ]
    response = llm.invoke(messages)
    return response.content
