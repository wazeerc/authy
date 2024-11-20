import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Credentials } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_URL = "http://localhost:5000";

async function makeAuthRequest(
  endpoint: "register" | "login",
  userCredentials: Credentials,
) {
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

export async function registerUser(userCredentials: Credentials) {
  return makeAuthRequest("register", userCredentials);
}

export async function loginUser(userCredentials: Credentials) {
  const data = await makeAuthRequest("login", userCredentials);
  localStorage.setItem("authToken", data.token);
  return true;
}
