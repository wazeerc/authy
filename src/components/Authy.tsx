import { LoginForm } from "./Form";

export const Authy = () => {
  return (
    <div className="rounded-md border-2 border-solid border-purple-200 px-24 py-20 shadow-sm">
      <h1 className="mb-14 text-5xl text-purple-500">Welcome to Authy</h1>
      <LoginForm />
    </div>
  );
};
