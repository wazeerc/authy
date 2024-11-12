import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Credentials } from "@/types";

import { loginUser, registerUser } from "@/lib/utils";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: Credentials) => {
      const result = await loginUser(credentials);
      return result;
    },
    onSuccess: () => {
      navigate("/success");
    },
    onError: error => {
      alert(error.message);
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: Credentials) => {
      await registerUser(credentials);
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: error => {
      alert(error.message);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: error => {
      alert(error.message);
    },
  });
};
