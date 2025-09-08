// src/pages/Dashboard/home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const suggestions = [
    "How can I manage stress better?",
    "Tips to improve my sleep schedule",
    "What are some quick relaxation techniques?",
    "How do I deal with anxiety in exams?",
  ];

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-sky-200 via-sky-50 to-violet-100 overflow-hidden font-sans">
      <div className="text-center max-w-3xl w-full p-6">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 drop-shadow-sm">
          Welcome to the Mindfull Matrix Services 🧠
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
          Get instant mental health guidance, relaxation tips, and emotional
          support at your fingertips.
        </p>

        {/* Suggestion Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
          {suggestions.map((text, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl text-gray-800 text-base font-medium border border-gray-200 shadow-md hover:shadow-xl hover:scale-105 hover:border-blue-300 transition-all duration-300 cursor-pointer"
              onClick={() => navigate("chatbot")} // 👈 navigate to chatbot on click
            >
              {text}
            </div>
          ))}
        </div>

        {/* Chat Button */}
        <button
          onClick={() => navigate("chatbot")} // 👈 fixed path here
          className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          Start Chat 💬
        </button>
      </div>
    </div>
  );
}

export default Home;
