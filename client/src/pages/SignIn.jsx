import Heading from "../components/Heading";
import InputElements from "../components/InputElements";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import SubHeading from "../components/SubHeading";

const SignIn = () => {
   return (
      <div className="flex items-center justify-center w-full h-screen">
         <div className="rounded-xl bg-gray-300 p-5 flex-col flex justify-center gap-5 w-96">
            <div>
               <Heading label={"Sign In"} />
               <SubHeading
                  label={"Enter your credentials to access your account"}
               />

               <InputElements
                  label={"Email"}
                  placeholder={"Johndoe@gmail.com"}
                  id={"email"}
                  type={"email"}
               />
               <InputElements
                  label={"Password"}
                  placeholder={"*********"}
                  id={"password"}
                  type={"password"}
               />
            </div>

            <div>
               <Button text={"Sign In"} />
            </div>

            <BottomWarning text={"Don't have an account?"} to={"Signup"} />
         </div>
      </div>
   );
};

export default SignIn;
