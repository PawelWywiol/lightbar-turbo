export const rafTimeout = (callback: () => void, timeout = 0): void => {
	let currentTime = -1;

	const loop = (time: number) => {
		if (currentTime === -1) {
			currentTime = time;
		}

		if (time - currentTime > timeout) {
			callback();
			currentTime = -1;
		} else {
			requestAnimationFrame(loop);
		}
	};

	requestAnimationFrame(loop);
};
