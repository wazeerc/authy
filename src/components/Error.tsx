import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useNavigate } from "react-router-dom";

type ErrorPageProps = {
  toastErrorMsg?: string;
};
export const Error = (props: ErrorPageProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    toast({
      description: `${props.toastErrorMsg || "This page is not available"}`,
      variant: "destructive",
      action: (
        <ToastAction altText="Login" onClick={() => navigate("/login")}>
          Login
        </ToastAction>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h1 className="text-6xl font-medium text-gray-500">404 Page Not Found</h1>
  );
};
