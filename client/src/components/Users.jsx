import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
   const [filter, setFilter] = useState("");
   const [users, setUsers] = useState([]);

   useEffect(() => {
      axios
         .get(`http://localhost:8000/api/v1/users/bulk?filter=${filter}`)
         .then((response) => {
            setUsers(response.data.users);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [filter]);

   return (
      <div className="pt-6">
         <h2 className="text-xl underline pl-3 font-semibold text-gray-800">
            Users
         </h2>

         <div className="pt-4">
            <div>
               <input
                  onChange={(e) => {
                     setFilter(e.target.value);
                  }}
                  className="py-2 border border-gray-400 outline-0 rounded px-5 w-full"
                  type="text"
                  placeholder="Search users..."
               />
            </div>

            {/* User List */}
            {users.map((user) => (
               <User key={user._id} user={user} />
            ))}
         </div>
      </div>
   );
};

function User({ user }) {
   const navigate = useNavigate();

   return (
      <div className="flex p-5 item-center justify-between border-b border-gray-300">
         <div className="flex items-center gap-3">
            <span className="w-10 flex items-center justify-center h-10 rounded-3xl bg-gray-400 cursor-pointer">
               {user.firstname.charAt(0)}
            </span>
            <h4 className="cursor-pointer text-gray-900 font-semibold ">
               {user.firstname} {user.lastname}
            </h4>
         </div>
         <div>
            <button
               onClick={(e) => {
                  e.preventDefault();
                  navigate(`/send?id=${user._id}&name=${user.firstname}`);
               }}
               className="py-2 px-5 bg-gray-800 hover:bg-gray-700 transition-colors border-0 outline-0 rounded text-white cursor-pointer"
            >
               Send Money
            </button>
         </div>
      </div>
   );
}

export default Users;
