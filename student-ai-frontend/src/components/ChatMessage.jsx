function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`max-w-3xl px-4 py-3 rounded-lg ${
        isUser
          ? "bg-blue-600 text-white self-end ml-auto"
          : "bg-zinc-800 text-zinc-100 self-start mr-auto"
      }`}
    >
      {/* IMPORTANT: pre + whitespace-pre-wrap */}
      <pre className="whitespace-pre-wrap font-sans text-sm">
        {content}
      </pre>
    </div>
  );
}

export default ChatMessage;
