import React from "react";

const InputElements = ({ label, placeholder, id, type, onChange }) => {
   return (
      <div className="flex flex-col gap-1 py-1">
         <label htmlFor="email" className="text-gray-800 pl-2 pb-1">
            {label}
         </label>
         <input
            type={type}
            id={id}
            placeholder={placeholder}
            className="border w-full border-gray-400 bg-gray-100 py-2 px-3 
            rounded outline-0 text-gray-900"
            onChange={onChange}
         />
      </div>
   );
};

export default InputElements;
