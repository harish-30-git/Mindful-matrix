import React from "react";

const EmotionCard = ({ label, selected, onClick }) => {
  return (
    <div
      className={`
        bg-white p-6 rounded-xl shadow-lg
        flex flex-col items-center cursor-pointer transition-all duration-300
        ${selected ? "ring-4 ring-blue-500" : "hover:shadow-xl"}
      `}
      onClick={onClick}
    >
      <span className="text-4xl">{label.split(" ")[1]}</span>
      <p className="mt-2 text-lg font-semibold text-gray-700">{label.split(" ")[0]}</p>
    </div>
  );
};

export default EmotionCard;
