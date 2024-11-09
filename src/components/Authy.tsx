import { cn } from "@/lib/utils";
import { DefaultForm } from "./Form";

export const Authy = () => {
  return (
    <div className={cn("rounded-md border-2 border-solid border-purple-200 px-24 py-20 shadow-sm")}>
      <h1 className={cn("mb-14 text-5xl text-purple-500")}>Welcome to Authy</h1>
      <DefaultForm formType={"login"} />
    </div>
  );
};
