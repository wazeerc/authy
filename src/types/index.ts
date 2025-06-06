export type FormType = "login" | "register";

export type Credentials = {
  username: string;
  password: string;
};

export interface AuthyFormProps {
  formType: FormType;
  onFormTypeChange: (type: FormType) => void;
}

export interface FormProps {
  action: "login" | "register";
  buttonText: string;
  onSubmit: (values: Credentials) => void;
  isSuccess?: boolean;
  activeUsername?: string;
}
