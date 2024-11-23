import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/use-auth";
import { Credentials } from "@/types";
import { AuthForm } from "@/components/AuthForm";

import { Loader } from "@/components/Loader";

import useStore from "../store/ZustandStore";

export const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync, isSuccess, isPending } = useAuth("login");

  const handleSubmit = async (values: Credentials) => {
    try {
      useStore.setState({ isAuthenticated: true });
      localStorage.setItem("isAuthenticated", "true");

      useStore.setState({ activeUserName: values.username });
      await mutateAsync(values);
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
            action="login"
            buttonText="Login"
            onSubmit={handleSubmit}
            isSuccess={isSuccess}
            activeUsername={useStore.getState().activeUserName || ""}
          />
          <span className={cn("mt-4 block")}>
            <a
              onClick={() => navigate("/register")}
              className={cn(
                "transition-150 underline transition-all hover:cursor-pointer",
                "dark:text-gray-300 dark:hover:text-gray-100",
                "text-neutral-700 hover:text-neutral-500",
              )}
            >
              Not a user? Register now.
            </a>
          </span>
        </div>
      )}
    </>
  );
};
