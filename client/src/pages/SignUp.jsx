import Heading from "../components/Heading";
import InputElements from "../components/InputElements";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import SubHeading from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
   const [firstname, setFirstname] = useState("");
   const [lastname, setLastname] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   return (
      <div className="flex items-center justify-center w-full h-screen">
         <div className="rounded-xl bg-gray-300 p-5 flex-col flex justify-center gap-5 w-96">
            <div>
               <Heading label={"Sign up"} />
               <SubHeading
                  label={"Enter your credentials to access your account"}
               />
               <InputElements
                  onChange={(e) => {
                     setFirstname(e.target.value);
                  }}
                  label={"Firstname"}
                  placeholder={"john"}
                  id={"firstname"}
                  type={"text"}
               />
               <InputElements
                  onChange={(e) => {
                     setLastname(e.target.value);
                  }}
                  label={"Lastname"}
                  placeholder={"doe"}
                  id={"lastname"}
                  type={"text"}
               />
               <InputElements
                  onChange={(e) => {
                     setEmail(e.target.value);
                  }}
                  label={"Email"}
                  placeholder={"Johndoe@gmail.com"}
                  id={"email"}
                  type={"email"}
               />
               <InputElements
                  onChange={(e) => {
                     setPassword(e.target.value);
                  }}
                  label={"Password"}
                  placeholder={"*********"}
                  id={"password"}
                  type={"password"}
               />
            </div>
            <div>
               <Button
                  text={"Sign Up"}
                  onClick={async () => {
                     try {
                        const response = await axios.post(
                           "http://localhost:8000/api/v1/users/signup",
                           {
                              firstname,
                              lastname,
                              username: email,
                              password,
                           },
                           {
                              headers: {
                                 "Content-Type": "application/json",
                              },
                           }
                        );

                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                        setFirstname("");
                        setLastname("");
                        setEmail("");
                        setPassword("");
                     } catch (error) {
                        console.error("Signup failed:", error);
                     }
                  }}
               />
            </div>

            <BottomWarning text={"Already have an account?"} to={"Signin"} />
         </div>
      </div>
   );
};

export default SignUp;
