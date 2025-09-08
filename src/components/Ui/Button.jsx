import React from "react";

const Button = ({ onClick, children, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
