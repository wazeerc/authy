import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { Credentials } from "@/types";
import { loginUser, logoutUser, registerUser } from "@/lib/utils";
import { useToast } from "./use-toast";

const authOptions = {
  login: "login",
  register: "register",
  logout: "logout",
} as const;
export type TAuthOptions = (typeof authOptions)[keyof typeof authOptions];

function useAuth(authType: TAuthOptions) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const isLogin = authType === authOptions.login;
  const isRegister = authType === authOptions.register;
  const isLogout = authType === authOptions.logout;

  const handleWrongAuthType = () => {
    throw new Error("Invalid auth type");
  };

  return useMutation({
    mutationFn: async (credentials?: Credentials) => {
      return isLogin
        ? await loginUser(credentials!)
        : isRegister
          ? await registerUser(credentials!)
          : isLogout
            ? logoutUser()
            : handleWrongAuthType();
    },
    onSuccess: () => {
      if (isLogin) {
        navigate("/home");
        toast({
          description: "Logged in successfully",
        });
      } else if (isRegister) {
        navigate("/login");
        toast({
          description: "Registered successfully",
        });
      } else if (isLogout) {
        navigate("/");
        toast({
          description: "You have been successfully logged out",
        });
      } else {
        handleWrongAuthType();
      }
    },
    onError: error => {
      const errorMsg = error.message;

      switch (errorMsg) {
        case "Failed to fetch":
          toast({
            description: "Network error",
            variant: "destructive",
          });
          break;

        case "Invalid credentials":
          toast({
            description: errorMsg,
            variant: "destructive",
          });
          break;

        default:
          toast({
            description: errorMsg,
            variant: "destructive",
          });
          break;
      }
    },
  });
}

export default useAuth;
