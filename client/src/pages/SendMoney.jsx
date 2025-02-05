import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useState } from "react";

const SendMoney = () => {
   const [searchParams] = useSearchParams();
   const id = searchParams.get("id");
   const name = searchParams.get("name");
   const [amount, setAmount] = useState(0);

   return (
      <div className="bg-gray-200 w-full h-screen">
         <Navbar />
         <div className="flex items-center justify-center pt-32">
            <div className="p-6 h-99 bg-gray-200 shadow-xl  rounded-lg w-86 flex flex-col gap-10">
               <div>
                  <h2 className="text-2xl  font-bold text-center ">
                     Send Money
                  </h2>
               </div>

               <div>
                  <div className="flex flex-col items-center justify-center gap-2">
                     <span className="w-20 flex items-center justify-center h-20 rounded-full bg-green-500 text-white text-3xl cursor-pointer">
                        {name.charAt(0)}
                     </span>

                     <div>
                        <h4 className="text-gray-900 text-xl font-semibold">
                           {name}
                        </h4>
                     </div>
                  </div>

                  <p className="text-gray-500 font-semibold pt-5 pb-2 pl-2 text-sm">
                     Amount (in Rs)
                  </p>
                  <input
                     onChange={(e) => {
                        setAmount(e.target.value);
                     }}
                     type="number"
                     placeholder="Enter Amount"
                     className="w-full p-2 text-gray-900 outline-0 pl-4 rounded-md border border-gray-300"
                  />
                  <button
                     onClick={(e) => {
                        axios.post(
                           `http://localhost:8000/api/v1/account/transfermoney`,
                           {
                              to: id,
                              amount: Number(amount),
                           },

                           {
                              headers: {
                                 Authorization: `Bearer ${localStorage.getItem(
                                    "token"
                                 )}`,
                              },
                           }
                        );
                     }}
                     className="bg-green-600 text-white mt-6 w-full p-2 rounded-md cursor-pointer hover:bg-green-500 transition-colors"
                  >
                     Send Money
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SendMoney;
