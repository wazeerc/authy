import { cn } from "@/lib/utils";

export function Loader(): JSX.Element {
  return (
    <div className={cn("flex min-h-screen items-center justify-center")}>
      <div
        className={cn(
          "h-32 w-32 animate-spin rounded-full border-8 border-purple-200 border-t-purple-500",
        )}
      />
    </div>
  );
}
