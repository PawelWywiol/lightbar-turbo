export interface TextFieldProps {
  className?: string;
  value: string;
  placeholder?: string | undefined;
  onChange: (value: string) => void;
  maxLength?: number;
}
