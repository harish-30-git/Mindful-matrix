import React, { useState, useEffect, useRef } from "react";
import { fetchWithToken } from "../../utils/api";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const chatEndRef = useRef(null);
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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

    recognition.onerror = () => setListening(false);
  }

  const speak = (text, idx) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
      if (speakingMsgIndex === idx) {
        setSpeakingMsgIndex(null);
        return;
      }
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-IN";
    utter.onend = () => setSpeakingMsgIndex(null);
    synth.speak(utter);
    setSpeakingMsgIndex(idx);
  };

  const startListening = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
    } else {
      alert("Speech recognition not supported.");
    }
  };

  const resetChat = async () => {
    try {
      await fetchWithToken("https://mindmatrix-3.onrender.com/chat/reset", { method: "POST" });
      setMessages([]);
    } catch (err) {
      console.error("Error resetting chat:", err);
    }
  };

  const sendMessage = async (msg = input) => {
    if (!msg.trim()) return;

    // Reset chat if starting with hi/hello
    if (/^(hi|hello)/i.test(msg.trim()) && messages.length > 0) {
      await resetChat();
    }

    const newMessages = [...messages, { sender: "user", text: msg }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const data = await fetchWithToken("https://mindmatrix-3.onrender.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: msg }),
      });

      setIsTyping(false);
      setMessages([...newMessages, { sender: "bot", text: data.response }]);
    } catch (error) {
      setIsTyping(false);
      setMessages([...newMessages, { sender: "bot", text: "⚠ Error connecting to server" }]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen flex flex-col items-center justify-start bg-gradient-to-tr from-sky-200 via-sky-50 to-violet-100 overflow-hidden font-sans p-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 drop-shadow-sm text-center">
        💬 Mindfull Matrix Chat Assistant
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl text-center mb-8">
        Ask anything about mental health, relaxation, or emotional support.
      </p>

      <div className="w-full max-w-2xl flex flex-col h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex mb-4 items-center ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[calc(70%-30px)] p-4 rounded-2xl shadow-lg ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white animate-slideInRight"
                    : "bg-gradient-to-r from-purple-400 to-purple-600 text-white animate-slideInLeft"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "bot" && (
                <span
                  className="ml-2 cursor-pointer text-xl text-purple-700 hover:text-purple-900 transition-all select-none"
                  onClick={() => speak(msg.text, idx)}
                >
                  {speakingMsgIndex === idx ? "⏸️" : "🔊"}
                </span>
              )}
            </div>
          ))}
          {isTyping && <div className="text-gray-500 text-sm italic mt-2 text-center">Bot is typing...</div>}
          <div ref={chatEndRef} />
        </div>

        <div className="flex items-center p-4 border-t border-gray-200 bg-white rounded-b-3xl shadow-inner">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
            placeholder="Type your question here..."
            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm shadow-inner"
          />
          <button
            onClick={sendMessage}
            className="ml-3 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-md hover:from-blue-700 hover:to-purple-700 hover:opacity-90 transition-all"
          >
            Send
          </button>
          <button
            onClick={startListening}
            className={`ml-2 p-3 rounded-full text-white shadow-md transition-all hover:opacity-90 ${
              listening ? "bg-red-500" : "bg-purple-500"
            }`}
          >
            🎤
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
