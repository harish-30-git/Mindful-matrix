import React from "react";

const EmotionCard = ({ label, selected, onClick, color }) => {
  // Assign literal Tailwind classes based on color
  let ringClass = "hover:shadow-xl"; // default for unselected

  if (selected) {
    if (color === "yellow") ringClass = "ring-4 ring-yellow-400";
    else if (color === "gray") ringClass = "ring-4 ring-gray-400";
    else if (color === "red") ringClass = "ring-4 ring-red-400";
    else if (color === "purple") ringClass = "ring-4 ring-purple-400";
    else ringClass = "ring-4 ring-blue-500";
  }

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-lg flex flex-col items-center cursor-pointer transition-all duration-300 ${ringClass}`}
      onClick={onClick}
    >
      <span className="text-4xl">{label.split(" ")[1]}</span>
      <p className="mt-2 text-lg font-semibold text-gray-700">{label.split(" ")[0]}</p>
    </div>
  );
};

export default EmotionCard;
    