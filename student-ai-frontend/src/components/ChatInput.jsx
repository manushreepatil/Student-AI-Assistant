import { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex gap-2 p-4 border-t border-zinc-700">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask a question…"
        className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm outline-none"
        disabled={loading}
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 rounded text-sm hover:bg-blue-500 disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
}
