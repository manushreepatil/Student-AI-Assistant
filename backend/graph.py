from typing import TypedDict
from langgraph.graph import StateGraph
from llm import generate_reply


class ChatState(TypedDict):
    message: str
    intent: str
    reply: str


def start_node(state: ChatState) -> ChatState:
    return {
        "message": state["message"],
        "intent": "",
        "reply": ""
    }


def intent_router(state: ChatState) -> ChatState:
    msg = state["message"].lower()
    intent = "learn" if any(x in msg for x in ["explain", "what", "how"]) else "clarify"

    return {
        "message": state["message"],
        "intent": intent,
        "reply": ""
    }


def response_node(state: ChatState) -> ChatState:
    ai_reply = generate_reply(state["message"])
    return {
        "message": state["message"],
        "intent": state["intent"],
        "reply": ai_reply
    }


graph = StateGraph(ChatState)
graph.add_node("start", start_node)
graph.add_node("router", intent_router)
graph.add_node("respond", response_node)

graph.set_entry_point("start")
graph.add_edge("start", "router")
graph.add_edge("router", "respond")

graph_app = graph.compile()
