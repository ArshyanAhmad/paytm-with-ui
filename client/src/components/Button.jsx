import React from "react";

const Button = ({ text, onClick }) => {
   return (
      <button
         onClick={onClick}
         className="w-full bg-black py-3 rounded text-white text-lg cursor-pointer hover:bg-gray-800 ease-in-out transition-colors"
      >
         {text}
      </button>
   );
};

export default Button;
