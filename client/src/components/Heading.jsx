import React from "react";

const Heading = ({ label }) => {
   return (
      <div className="font-bold underline text-center pb-4 text-3xl">
         {label}
      </div>
   );
};

export default Heading;
