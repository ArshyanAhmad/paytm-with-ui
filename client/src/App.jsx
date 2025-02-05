import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import NotFound from "./pages/NotFound";

const App = () => {
   const token = localStorage.getItem("token");

   if (!token) {
      return (
         <Router>
            <Routes>
               <Route path="/" element={token ? <Dashboard /> : <SignIn />} />
               <Route path="*" element={<NotFound />} />
               <Route path="/signup" element={<SignUp />} />
               <Route path="/signin" element={<SignIn />} />
            </Routes>
         </Router>
      );
   }
   return (
      <Router>
         <Routes>
            <Route path="/send" element={<SendMoney />} />
            <Route path="/" element={<Dashboard />} />
         </Routes>
      </Router>
   );
};

export default App;
