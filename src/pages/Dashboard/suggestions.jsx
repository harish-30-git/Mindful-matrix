import React, { useState, useEffect } from "react";
import EmotionCard from "../../components/Ui/EmotionCard";
import Button from "../../components/Ui/Button";
import { fetchWithToken } from "../../utils/api"; // helper for JWT requests

// Debounce hook (to avoid calling API too often while typing)
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const Suggestions = () => {
  const [journalText, setJournalText] = useState("");
  const [predictedMood, setPredictedMood] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const emotions = [
    { label: "Happy 😊", value: "happy", color: "yellow" },
    { label: "Neutral 🙂", value: "neutral", color: "gray" },
    { label: "Stressed 😔", value: "stressed", color: "red" },
    { label: "Anxious 😟", value: "anxious", color: "purple" },
    { label: "Others 😶", value: "others", color: "blue" },
  ];

  const debouncedJournal = useDebounce(journalText, 1000);

  useEffect(() => {
    const predictMood = async () => {
      if (debouncedJournal.trim() === "") {
        setPredictedMood(null);
        setMessage("");
        return;
      }

      setLoading(true);
      try {
        // Step 1: Ask backend for prediction + suggestion
        const data = await fetchWithToken("https://mindmatrix-3.onrender.com/api/get-suggestions", {
          method: "POST",
          body: JSON.stringify({ mood: null, journal_entry: debouncedJournal }),
        });

        let moodToHighlight = data.mood || "others";
        moodToHighlight = moodToHighlight.toLowerCase();
        if (!["happy", "neutral", "stressed", "anxious"].includes(moodToHighlight)) {
          moodToHighlight = "others";
        }

        setPredictedMood(moodToHighlight);
        setMessage(data.suggestion || "");

        // Step 2: Map moods → scores for chart
        const moodScores = { happy: 8, neutral: 5, stressed: 3, anxious: 2, others: 4 };

        // Step 3: Save into DB with JWT token
        await fetchWithToken("https://mindmatrix-3.onrender.com/api/save-mood", {
          method: "POST",
          body: JSON.stringify({
            mood: moodToHighlight,
            score: moodScores[moodToHighlight] || 5,
          }),
        });
      } catch (error) {
        console.error("Error fetching suggestion:", error);
        setMessage("Failed to connect to backend.");
      } finally {
        setLoading(false);
      }
    };

    predictMood();
  }, [debouncedJournal]);

  const getTextareaBorderColor = () => {
    switch (predictedMood) {
      case "happy":
        return "border-yellow-400";
      case "neutral":
        return "border-gray-400";
      case "stressed":
        return "border-red-400";
      case "anxious":
        return "border-purple-400";
      case "others":
        return "border-blue-400";
      default:
        return "border-gray-300";
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-tr from-sky-200 via-sky-50 to-violet-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        How are you feeling today?
      </h1>

      {/* Mood cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6 w-full max-w-2xl">
        {emotions.map((emotion) => (
          <EmotionCard
            key={emotion.value}
            label={emotion.label}
            color={emotion.color}
            selected={predictedMood === emotion.value}
            onClick={null}
          />
        ))}
      </div>

      {/* Journal input */}
      <div className="w-full mb-4">
        <h2 className="text-xl font-semibold mb-2">Write about your day:</h2>
        <textarea
          className={`w-full h-36 p-4 rounded-md text-gray-800 bg-white focus:outline-none resize-none border-2 transition-all duration-300 ${getTextareaBorderColor()}`}
          placeholder="What happened today? How are you feeling? Any specific events or thoughts?"
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* AI suggestion */}
      {message && (
        <div className="w-full max-w-2xl mb-4 p-4 rounded-lg bg-white shadow-md border border-gray-300">
          <h3 className="font-semibold mb-2 text-gray-700">AI Suggestion:</h3>
          <p className="text-gray-800">{message}</p>
        </div>
      )}

      <Button disabled>
        {loading ? "Analyzing..." : "Mood detected automatically"}
      </Button>
    </div>
  );
};

export default Suggestions;
