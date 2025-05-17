import { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!input) return;
    setResponse("⏳ Жду ответа от ИИ...");

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "Ты заботливый и мягкий психолог. Помоги пользователю с поддержкой, без оценок и советов.",
          },
          {
            role: "user",
            content: input,
          },
        ],
      }),
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Нет ответа";
    setResponse(reply);
  };

  return (
    <div className="App" style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>🧠 Психоассистент</h2>
      <textarea
        placeholder="Что тебя тревожит?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        style={{ width: "100%", fontSize: "16px" }}
      />
      <br />
      <button onClick={handleSend} style={{ marginTop: "10px" }}>
        Поговорить с ИИ
      </button>
      <p style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>{response}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
