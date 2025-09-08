import React, { useState } from 'react';

const Suggestions = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [journalText, setJournalText] = useState("");
  const [message, setMessage] = useState("");

  const emotions = [
    { label: 'Happy 😊', value: 'happy' },
    { label: 'Neutral 🙂', value: 'neutral' },
    { label: 'Stressed 😔', value: 'stressed' },
    { label: 'Anxious 😟', value: 'anxious' },
  ];

  const handleSubmit = async () => {
    if (!selectedEmotion && journalText.trim() === "") {
      setMessage("Please select a mood or write in the journal.");
      return;
    }
    
    setMessage("Sending data...");
    
    try {
      const response = await fetch("http://127.0.0.1:5000/api/get-suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood: selectedEmotion,
          journal_entry: journalText.trim(),
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(`Suggestion from AI: "${data.suggestion}"`);
        setJournalText("");
        setSelectedEmotion(null);
      } else {
        setMessage(`Error from backend: ${data.error}`);
      }
    } catch (error) {
      setMessage("Failed to connect to the backend.");
      console.error("Connection error:", error);
    }
  };

  return (
    // Main container with Flexbox for vertical arrangement and some padding
    <div className="flex flex-col items-center bg-gradient-to-tr from-sky-200 via-sky-50 to-violet-100 min-h-screen">
      <div className="p-6">
        {/* Top section with title and centered emotion boxes */}
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">How are you feeling today?</h1>
        
        {/* Emotion Boxes - horizontally centered grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full max-w-2xl">
          {emotions.map((emotion) => (
            <div
              key={emotion.value}
              className={`
                bg-white p-6 rounded-xl shadow-lg
                flex flex-col items-center cursor-pointer transition-all duration-300
                ${selectedEmotion === emotion.value ? 'ring-4 ring-blue-500' : 'hover:shadow-xl'}
              `}
              onClick={() => setSelectedEmotion(emotion.value)}
            >
              <span className="text-4xl">{emotion.label.split(' ')[1]}</span>
              <p className="mt-2 text-lg font-semibold text-gray-700">{emotion.label.split(' ')[0]}</p>
            </div>
          ))}
        </div>
        
        {/* Bottom section with text input and submit button */}
        <div className="w-full max-w-2xl">
          {/* Gradient Text Input */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Write about your day:</h2>
            <div className="p-1 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 focus-within:from-blue-600 focus-within:via-purple-600 focus-within:to-pink-600 transition-all duration-300">
              <textarea
                className="w-full h-32 p-4 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-0 resize-none"
                placeholder="I feel..."
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              Submit
            </button>
          </div>
          
          {/* Response Message */}
          {message && (
            <p className="mt-6 text-center text-sm font-medium text-gray-700">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;