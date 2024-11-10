import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Credentials } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function registerUser(userCredentials: Credentials) {
  const token = btoa(`${userCredentials.username}:${userCredentials.password}`);
  localStorage.setItem("authToken", token);
}

export function loginUser(userCredentials: Credentials) {
  const token = btoa(`${userCredentials.username}:${userCredentials.password}`);
  const storedToken = localStorage.getItem("authToken");
  if (token === storedToken) return true;
  return false;
}
