import Navbar from "../components/Navbar";
import Balance from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
   return (
      <div className="bg-gray-200 w-full h-screen">
         <Navbar />
         <div className="p-6">
            <Balance />
            <Users />
         </div>
      </div>
   );
};

export default Dashboard;
