import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { Credentials } from "@/types";
import { loginUser, registerUser } from "@/lib/utils";
import { useToast } from "./use-toast";

import useStore from "../store/ZustandStore";

const authOptions = {
  login: "login",
  register: "register",
  logout: "logout",
} as const;
type TAuthOptions = (typeof authOptions)[keyof typeof authOptions];

function useAuth(authType: TAuthOptions) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const isLogin = authType === authOptions.login;
  const isRegister = authType === authOptions.register;
  const isLogout = authType === authOptions.logout;

  const handleLogout = () => {
    useStore.setState({ activeUserName: "" });
    localStorage.removeItem("isAuthenticated");

    toast({
      description: "You have been successfully logged out",
    });
  };

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
            ? handleLogout()
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
