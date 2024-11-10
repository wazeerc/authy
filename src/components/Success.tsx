import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Success = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className={cn("rounded-lg bg-white p-8 text-center shadow-md")}>
      <div className={cn("mb-4 text-5xl text-green-500")}>✓</div>
      <h1 className={cn("mb-4 text-2xl text-neutral-800")}>Login Successful!</h1>
      <p className={cn("mb-6 text-neutral-600")}>Welcome back! You have successfully logged in.</p>
      <button
        onClick={handleLogout}
        className={cn(
          "rounded bg-purple-500 px-6 py-2 text-white transition-colors hover:bg-purple-600",
        )}
      >
        Logout
      </button>
    </div>
  );
};
