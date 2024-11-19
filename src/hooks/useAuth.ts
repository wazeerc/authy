import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { Credentials } from "@/types";
import { loginUser, registerUser } from "@/lib/utils";

const authOptions = {
  login: "login",
  register: "register",
  logout: "logout",
} as const;
type TAuthOptions = (typeof authOptions)[keyof typeof authOptions];

function useAuth(authType: TAuthOptions) {
  const navigate = useNavigate();

  const isLogin = authType === authOptions.login;
  const isRegister = authType === authOptions.register;

  return useMutation({
    mutationFn: async (credentials?: Credentials) => {
      return isLogin
        ? await loginUser(credentials!)
        : isRegister
          ? await registerUser(credentials!)
          : localStorage.removeItem("token");
    },
    onSuccess: () => {
      return isLogin
        ? navigate("/home")
        : isRegister
          ? navigate("/login")
          : navigate("/");
    },
    onError: error => {
      alert(error.message);
    },
  });
}

export default useAuth;
