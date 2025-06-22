import React, { useState, useRef, useEffect } from "react";

const EXAMPLES = [
  "How can I improve my team's productivity?",
  "Give me a summary of our Q2 sales performance.",
  "Suggest strategies for business growth in 2025.",
  "What are the best practices for remote team management?"
];

export default function BusinessChatbot({ userEmail, userName }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: `Hello${userName ? ", " + userName : ""}! I'm  NOVA Business AI. How can I help you today?` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Call backend for real AI response
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setLoading(true);
    setInput("");
    try {
      const res = await fetch("https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod/business_ai_chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          userEmail: userEmail,
          userName: userName
        })
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(msgs => [
          ...msgs,
          { role: "ai", text: data.response || "(No response)" }
        ]);
      } else {
        setMessages(msgs => [
          ...msgs,
          { role: "ai", text: "Sorry, I couldn't process your request right now." }
        ]);
      }
    } catch (e) {
      setMessages(msgs => [
        ...msgs,
        { role: "ai", text: "Network error. Please try again." }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl flex flex-col items-center">
      <div className="w-full h-96 overflow-y-auto bg-white/60 rounded-xl shadow-inner p-4 mb-4 border border-[#e0c3fc]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-2xl max-w-[80%] text-base ${msg.role === "user" ? "bg-[#7c3aed] text-white" : "bg-gray-100 text-gray-700"} animate-fade-in`}>
              {msg.text.replace(/Nucleus Business AI/g, 'NOVA Business AI').replace(/Nucleus AI/g, 'NOVA').replace(/Nucleus/g, 'NOVA')}
            </div>
          </div>
        ))}
        {loading && (
          <div className="mb-3 flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-gray-100 text-gray-400 animate-pulse max-w-[80%]">Thinking...</div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 rounded-2xl border border-[#e0c3fc] focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white/80 text-base"
            type="text"
            placeholder="Type your business question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
            disabled={loading}
            aria-label="Business chatbot input"
            autoFocus
          />
          <button
            className="px-6 py-2 rounded-2xl bg-[#7c3aed] text-white font-bold shadow hover:bg-[#5b21b6] transition disabled:opacity-50"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            Send
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              className="px-3 py-1 rounded-xl bg-gray-200 text-gray-600 text-xs hover:bg-[#e0c3fc] transition"
              onClick={() => setInput(ex)}
              disabled={loading}
              aria-label={`Use example: ${ex}`}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
