const Navbar = () => {
   return (
      <div className="flex justify-between items-center p-4 border-b-2 border-gray-400 ">
         <div>
            <h4 className="text-lg font-semibold text-gray-800 cursor-pointer">
               Paytm App
            </h4>
         </div>
         <div className="flex align-center gap-3">
            <h4 className="flex items-center">Hello </h4>

            <span className=" w-10 flex items-center justify-center h-10 rounded-3xl bg-gray-400 cursor-pointer">
               U
            </span>
         </div>
      </div>
   );
};

export default Navbar;
