export const getPositionFromEvent = (
	event: Event,
): { offsetX: number; offsetY: number } => {
	const mouseEvent = event as MouseEvent;
	const touchEvent = event as TouchEvent;

	const offsetX = touchEvent.touches?.length
		? (touchEvent.touches[0]?.clientX ?? 0)
		: mouseEvent.clientX || 0;
	const offsetY = touchEvent.touches?.length
		? (touchEvent.touches[0]?.clientY ?? 0)
		: mouseEvent.clientY || 0;

	return { offsetX, offsetY };
};

export const getChildElementFromPoint = (
	x: number,
	y: number,
	parent: HTMLDivElement,
): number => {
	const element = document?.elementFromPoint(x, y);
	if (!element) {
		return -1;
	}

	const children = [...parent.children];
	return children.indexOf(element);
};

export const setChildElementBackgroundColor = (
	index: number,
	color: string,
	parent: HTMLDivElement,
): void => {
	const children = [...parent.children];
	const element = children[index] as HTMLDivElement;
	element?.style.setProperty("background", color);
};
