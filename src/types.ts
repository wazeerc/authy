export interface FormValues {
  username: string;
  password: string;
}

export interface FormProps {
  action: "login" | "register";
  buttonText: string;
  onSubmit: (values: FormValues) => void;
}
