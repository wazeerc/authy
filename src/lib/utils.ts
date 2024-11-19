import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Credentials } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_URL = "http://localhost:5000";

export async function registerUser(userCredentials: Credentials) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userCredentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
}

export async function loginUser(userCredentials: Credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userCredentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  localStorage.setItem("authToken", data.token);
  return true;
}
