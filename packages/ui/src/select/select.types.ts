export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  defaultValue?: string;
  placeholder?: string;
  options: SelectOption[] | string[] | number[];
}
