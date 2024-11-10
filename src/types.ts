export interface Credentials {
  username: string;
  password: string;
}

export interface FormProps {
  action: "login" | "register";
  buttonText: string;
  onSubmit: (values: Credentials) => void;
  isSuccess?: boolean;
}
