//#region: Tailwind CSS cn function
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//#endregion

//#region: Auth API functions
import useStore from "@/store/ZustandStore";

import { Credentials } from "@/types";
import { TAuthOptions } from "../hooks/use-auth";

const API_URL = `http://localhost:5000`;

type AuthResponse = {
  message: string;
  token: string;
};

//? Ideally creds should be encrypted when making requests or use HTTPS
async function makeAuthRequest(
  endpoint: Omit<TAuthOptions, "logout">,
  userCredentials: Credentials,
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userCredentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}

export async function registerUser(
  userCredentials: Credentials,
): Promise<string> {
  const response = await makeAuthRequest("register", userCredentials);
  return response.token;
}

export async function loginUser(userCredentials: Credentials): Promise<string> {
  const response = await makeAuthRequest("login", userCredentials);
  const token = response.token;

  localStorage.setItem("token", token);
  localStorage.setItem("isAuthenticated", "true");

  useStore.setState({
    isAuthenticated: true,
    activeUserName: userCredentials.username,
  });

  return token;
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("isAuthenticated");

  useStore.setState({ activeUserName: "" });
}
//#endregion
