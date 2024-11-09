export type FormType = "login" | "register";

export type FormValues = {
  username: string;
  password: string;
};

export interface AuthyFormProps {
  formType: FormType;
  onFormTypeChange: (type: FormType) => void;
}