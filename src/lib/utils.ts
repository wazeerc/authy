import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Credentials } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const fakeResponseDelay: number = 2000;
export async function registerUser(userCredentials: Credentials) {
  await new Promise(resolve => setTimeout(resolve, fakeResponseDelay));

  const token = btoa(`${userCredentials.username}:${userCredentials.password}`);
  localStorage.setItem("authToken", token);
}

export async function loginUser(userCredentials: Credentials) {
  await new Promise(resolve => setTimeout(resolve, fakeResponseDelay));

  const token = btoa(`${userCredentials.username}:${userCredentials.password}`);
  const storedToken = localStorage.getItem("authToken");
  if (token === storedToken) return true;
  throw new Error("Invalid credentials");
}
