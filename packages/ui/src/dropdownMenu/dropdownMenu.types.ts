import type { ReactNode } from "react";

export interface DropDownMenuOption {
	label: string;
	onClick?: () => void;
}

export interface DropDownMenuProps {
	trigger?: ReactNode;
	options: DropDownMenuOption[];
}
