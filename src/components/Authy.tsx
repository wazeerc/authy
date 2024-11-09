"use client";

import { cn } from "@/lib/utils";
import { DefaultForm } from "./Form";
import { useState } from "react";

export const Authy = () => {
  const [formType, setFormType] = useState<"login" | "register">("login");

  const handleFormTypeChange = (type: "login" | "register") => {
    setFormType(type);
  };

  return (
    <div className={cn("rounded-md border-2 border-solid border-purple-200 px-24 py-20 shadow-sm")}>
      <h1 className={cn("mb-14 text-5xl text-purple-500")}>Welcome to Authy</h1>
      <DefaultForm formType={formType} onFormTypeChange={handleFormTypeChange} />
      <span className={cn("mt-4 block")}>
        <a
          onClick={() => handleFormTypeChange(formType === "login" ? "register" : "login")}
          className={cn(
            "transition-150 text-neutral-700 underline transition-all hover:cursor-pointer hover:text-neutral-500",
          )}
        >
          {formType === "login" ? "Not a user? Register now." : "Already have an account? Login"}
        </a>
      </span>
    </div>
  );
};
