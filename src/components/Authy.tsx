import { cn } from "@/lib/utils";
import { LoginForm } from "./Form";

export const Authy = () => {
  return (
    <div className={cn("rounded-md border-2 border-solid border-purple-200 px-24 py-20 shadow-sm")}>
      <h1 className={cn("mb-14 text-5xl text-purple-500")}>Welcome to Authy</h1>
      <LoginForm />
      <span className={cn("mt-4 block")}>
        <a
          href="/register"
          className={cn("text-neutral-700 underline hover:cursor-pointer hover:text-neutral-500")}
        >
          Not a user? Register now.
        </a>
      </span>
    </div>
  );
};
