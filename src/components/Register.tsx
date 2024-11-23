import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/use-auth";
import { Credentials } from "@/types";
import { AuthForm } from "@/components/AuthForm";

import { Loader } from "@/components/Loader";

import useStore from "../store/ZustandStore";

export const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useAuth("register");

  const handleSubmit = async (values: Credentials) => {
    try {
      useStore.setState({ activeUserName: values.username });
      await mutateAsync(values);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <div
          className={cn(
            "rounded-md border-4 border-solid px-24 py-20 shadow-sm",
            "border-purple-200 dark:border-purple-700",
            "bg-white dark:bg-gray-800",
          )}
        >
          <h1
            className={cn(
              "mb-14 text-5xl",
              "text-purple-500 dark:text-purple-400",
            )}
          >
            Welcome to Authy
          </h1>
          <AuthForm
            action="register"
            buttonText="Register"
            onSubmit={handleSubmit}
          />
          <span className={cn("mt-4 block")}>
            <a
              onClick={() => navigate("/login")}
              className={cn(
                "transition-150 underline transition-all hover:cursor-pointer",
                "dark:text-gray-300 dark:hover:text-gray-100",
                "text-neutral-700 hover:text-neutral-500",
              )}
            >
              Already have an account? Login
            </a>
          </span>
        </div>
      )}
    </>
  );
};
