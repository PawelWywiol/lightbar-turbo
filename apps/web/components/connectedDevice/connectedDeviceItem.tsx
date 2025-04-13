import { MESSAGES } from "config/messages";
import { Button } from "ui/button";
import { DropDownMenuWrapper } from "ui/dropdownMenu";

import { ConnectedDeviceInfo } from "./connectedDeviceInfo";

import type { ConnectedDeviceValidationSchema } from "devices/devices.schema";
import type { ConnectedDevice } from "devices/devices.types";

interface ConnectedDeviceItemProps {
	device: ConnectedDevice;
	isSelected: boolean;
	onSelect: (url: string) => void;
	onEdit: (device: ConnectedDeviceValidationSchema) => void;
	onDelete: (device: ConnectedDevice) => void;
}

export const ConnectedDeviceItem = ({
	device,
	isSelected,
	onSelect,
	onEdit,
	onDelete,
}: ConnectedDeviceItemProps) => (
	<div className="flex justify-center items-center text-left gap-4">
		<Button
			className="flex flex-1 justify-stretch p-2 h-auto"
			variant={isSelected ? "secondary" : "ghost"}
			onClick={() => onSelect(device.url)}
		>
			<ConnectedDeviceInfo device={device} />
		</Button>
		<DropDownMenuWrapper
			options={[
				{
					label: MESSAGES.common.select,
					onClick: () => onSelect(device.url),
				},
				{
					label: MESSAGES.common.edit,
					onClick: () => onEdit(device),
				},
				{
					label: MESSAGES.common.delete,
					onClick: () => onDelete(device),
				},
			]}
		/>
	</div>
);
