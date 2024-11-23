//#region: Tailwind CSS cn function
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//#endregion

//#region: Auth API functions
import { Credentials } from "@/types";

const API_URL = `http://localhost:5000`;

//? Ideally should be encrypted when making requests or use HTTPS
async function makeAuthRequest(
  endpoint: "register" | "login",
  userCredentials: Credentials,
): Promise<{ token: string }> {
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
): Promise<{ token: string }> {
  return makeAuthRequest("register", userCredentials);
}

export async function loginUser(
  userCredentials: Credentials,
): Promise<boolean> {
  const data = await makeAuthRequest("login", userCredentials);
  localStorage.setItem("authToken", data.token);
  return true;
}
//#endregion
