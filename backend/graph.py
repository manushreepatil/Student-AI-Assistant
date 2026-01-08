from llm import generate_reply

class GraphApp:
    def invoke(self, state: dict):
        # state must be a dict
        message = state.get("message", "")
        return generate_reply(message)

graph_app = GraphApp()
