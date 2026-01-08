export default function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg text-sm whitespace-pre-wrap
          ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 text-zinc-100 border border-zinc-700"
          }
        `}
      >
        {content}
      </div>
    </div>
  );
}
