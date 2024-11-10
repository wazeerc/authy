import { useNavigate } from "react-router-dom";

import { cn, registerUser } from "@/lib/utils";
import { Credentials } from "@/types";
import { AuthForm } from "@/components/Form";

export const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: Credentials) => {
    registerUser(values);
    alert("Registration successful! Please login to continue.");
  };

  return (
    <div className={cn("rounded-md border-2 border-solid border-purple-200 px-24 py-20 shadow-sm")}>
      <h1 className={cn("mb-14 text-5xl text-purple-500")}>Welcome to Authy</h1>
      <AuthForm action="register" buttonText="Register" onSubmit={handleSubmit} />
      <span className={cn("mt-4 block")}>
        <a
          onClick={() => navigate("/login")}
          className={cn(
            "transition-150 text-neutral-700 underline transition-all hover:cursor-pointer hover:text-neutral-500",
          )}
        >
          Already have an account? Login
        </a>
      </span>
    </div>
  );
};
