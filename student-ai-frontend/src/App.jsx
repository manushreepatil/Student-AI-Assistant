import { useState } from "react";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";

function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 I’m your Student AI Assistant. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
const handleSend = async (text) => {
  if (!text.trim()) return;

  setMessages((prev) => [...prev, { role: "user", content: text }]);
  setLoading(true);

  try {
    const res = await fetch(
      "https://student-ai-backend-sx69.onrender.com/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      }
    );

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: typeof data.reply === "string" ? data.reply : JSON.stringify(data.reply, null, 2) },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "⚠️ Backend connection failed" },
    ]);
  } finally {
    setLoading(false);
  }
};

  
  return (
    <div className="h-screen w-screen bg-zinc-900 text-zinc-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-800 border-r border-zinc-700 p-4">
        <h1 className="text-xl font-semibold mb-6">Student AI</h1>
        <nav className="space-y-3 text-sm">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-zinc-700">Dashboard</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-zinc-700">Chats</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-zinc-700">Agents</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-zinc-700">Settings</button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b border-zinc-700 px-6 flex items-center">
          AI Workspace
        </header>

        <section className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} content={m.content} />
          ))}
          {loading && (
            <div className="text-sm text-zinc-400">AI is thinking…</div>
          )}
        </section>

        <ChatInput onSend={handleSend} loading={loading} />
      </main>
    </div>
  );
}

export default App;
