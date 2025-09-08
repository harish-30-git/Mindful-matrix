import React, { useState } from "react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);

  // 🎙 Speech Recognition setup
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      alert("Voice recognition error. Try again!");
    };
  }

  // 🔊 Text-to-Speech
  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-IN";
    synth.speak(utter);
  };

  const sendMessage = async (msg = input) => {
    if (!msg.trim()) return;
    const newMessages = [...messages, { sender: "user", text: msg }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await response.json();
      setIsTyping(false);
      setMessages([...newMessages, { sender: "bot", text: data.response }]);
      speak(data.response);
    } catch (error) {
      setIsTyping(false);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠ Error connecting to server" },
      ]);
    }
  };

  const startListening = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
    } else {
      alert("Speech recognition not supported in this browser.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-tr from-sky-200 via-sky-50 to-violet-100 min-h-screen">
      {/* Centered chat box container */}
      <div className="w-full max-w-2xl h-[650px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white font-bold text-lg text-center tracking-wider rounded-t-3xl">
          💬 Mental Health Chat Assistant
        </div>

        {/* Messages container */}
        <div className="flex-1 p-5 overflow-y-auto bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex mb-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-4 rounded-xl max-w-[70%] text-white shadow-md ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-blue-700"
                    : "bg-gradient-to-r from-purple-400 to-purple-600"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="text-gray-500 text-sm text-center mt-2 italic">
              Bot is typing...
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="flex p-4 border-t border-gray-200 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask about mental health, stress, wellness..."
            className="flex-1 p-3 mr-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          />
          <button
            onClick={sendMessage}
            className="p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg transition-all hover:opacity-90 active:scale-95 mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
          <button
            onClick={startListening}
            className={`p-3 text-white rounded-full shadow-lg transition-all hover:opacity-90 active:scale-95 ${
              listening
                ? "bg-gradient-to-r from-red-500 to-red-700"
                : "bg-gradient-to-r from-purple-500 to-purple-700"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M8.25 4.5a.75.75 0 0 1 .75.75v14.25a.75.75 0 0 1-1.5 0V5.25a.75.75 0 0 1 .75-.75ZM21.75 9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75ZM2.25 9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 2.25 9ZM16.5 4.5a.75.75 0 0 1 .75.75v14.25a.75.75 0 0 1-1.5 0V5.25a.75.75 0 0 1 .75-.75ZM11.25 4.5a.75.75 0 0 1 .75.75v14.25a.75.75 0 0 1-1.5 0V5.25a.75.75 0 0 1 .75-.75Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;