import React from "react";
import { Link } from "react-router-dom";

const BottomWarning = ({ text, to }) => {
   return (
      <div className="flex gap-1 items-center justify-center">
         <h2 className="text-center font-semibold ">{text}</h2>
         <Link to={`/${to}`} className="text-blue-700">
            {to}
         </Link>
      </div>
   );
};

export default BottomWarning;
