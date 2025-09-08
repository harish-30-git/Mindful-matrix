import React, { useState } from "react";
import EmotionCard from "../../components/Ui/EmotionCard";
import Button from "../../components/Ui/Button";

const Suggestions = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [journalText, setJournalText] = useState("");
  const [message, setMessage] = useState("");
  const [predictedMood, setPredictedMood] = useState(null);

  const emotions = [
    { label: "Happy 😊", value: "happy" },
    { label: "Neutral 🙂", value: "neutral" },
    { label: "Stressed 😔", value: "stressed" },
    { label: "Anxious 😟", value: "anxious" },
  ];

  const handleSubmit = async () => {
    if (!selectedEmotion && journalText.trim() === "") {
      setMessage("Please select a mood or write in the journal.");
      return;
    }

    setMessage("Sending data...");
    setPredictedMood(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/get-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: selectedEmotion,
          journal_entry: journalText.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.suggestion);
        setPredictedMood(data.mood);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Failed to connect to the backend.");
      console.error("Connection error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-tr from-sky-200 via-sky-50 to-violet-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        How are you feeling today?
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 w-full max-w-2xl">
        {emotions.map((emotion) => (
          <EmotionCard
            key={emotion.value}
            label={emotion.label}
            selected={predictedMood ? predictedMood === emotion.value : selectedEmotion === emotion.value}
            onClick={() => !predictedMood && setSelectedEmotion(emotion.value)}
          />
        ))}
      </div>

      <div className="w-full max-w-2xl mb-6">
        <h2 className="text-lg font-semibold mb-2">Write about your day:</h2>
        <div className="p-1 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          <textarea
            className="w-full h-32 p-4 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-0 resize-none"
            placeholder="I feel..."
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={!!predictedMood}>
        Submit
      </Button>

      {message && (
        <div className="w-full max-w-2xl mt-6 p-4 rounded-lg bg-white shadow-md border border-gray-300">
          <h3 className="font-semibold mb-2 text-gray-700">AI Suggestion:</h3>
          <p className="text-gray-800">{message}</p>
        </div>
      )}
    </div>
  );
};

export default Suggestions;