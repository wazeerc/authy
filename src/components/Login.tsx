import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLogin } from "@/hooks/useAuth";
import { Credentials } from "@/types";
import { AuthForm } from "@/components/Form";

import { Loader } from "@/components/Loader";

export const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync, isSuccess, isPending } = useLogin();

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
          className={cn("rounded-md border-2 border-solid border-purple-200 px-24 py-20 shadow-sm")}
        >
          <h1 className={cn("mb-14 text-5xl text-purple-500")}>Welcome to Authy</h1>
          <AuthForm
            action="login"
            buttonText="Login"
            onSubmit={handleSubmit}
            isSuccess={isSuccess}
          />
          <span className={cn("mt-4 block")}>
            <a
              onClick={() => navigate("/register")}
              className={cn(
                "transition-150 text-neutral-700 underline transition-all hover:cursor-pointer hover:text-neutral-500",
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
