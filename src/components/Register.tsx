import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useRegister } from "@/hooks/useAuth";
import { Credentials } from "@/types";
import { AuthForm } from "@/components/Form";

import { Loader } from "@/components/Loader";

export const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegister();

  const handleSubmit = async (values: Credentials) => {
    try {
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
            "dark:border-purple-700 border-purple-200",
            "dark:bg-gray-800 bg-white"
          )}
        >
          <h1 className={cn("mb-14 text-5xl", "dark:text-purple-400 text-purple-500")}>Welcome to Authy</h1>
          <AuthForm action="register" buttonText="Register" onSubmit={handleSubmit} />
          <span className={cn("mt-4 block")}>
            <a
              onClick={() => navigate("/login")}
              className={cn(
                "transition-150 underline transition-all hover:cursor-pointer",
                "dark:text-gray-300 dark:hover:text-gray-100",
                "text-neutral-700 hover:text-neutral-500"
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
