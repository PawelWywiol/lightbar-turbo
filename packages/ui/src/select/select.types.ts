export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: SelectOption[] | string[] | number[];
}
