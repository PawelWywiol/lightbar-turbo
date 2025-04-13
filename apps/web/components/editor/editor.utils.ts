import {
	LIGHTS_BACKGROUND_COLOR,
	LIGHTS_PALLETTE_HUE_MASK,
	LIGHTS_PALLETTE_HUE_MAX,
	LIGHTS_PALLETTE_LIGHTNESS_BASE,
	LIGHTS_PALLETTE_LIGHTNESS_MASK,
	LIGHTS_PALLETTE_LIGHTNESS_STEP,
} from "devices/lights.config";
import { secureRandomNumber } from "utils/uid";

import type {
	LightColor,
	LightsLayoutOption,
	LightsScheme,
} from "devices/lights.types";
import type { ShiftColorsFrame, ShiftDirection } from "./editor.types";

const transposeLightsMatrix = (matrix: LightColor[][]) =>
	(matrix[0] ?? []).map((_, index) =>
		matrix.map((row) => row[index] ?? LIGHTS_BACKGROUND_COLOR),
	);

export const shiftColorsFrame: ShiftColorsFrame = (
	frame,
	direction,
	rowsCount,
	columnsCount,
) => {
	const newFrame: LightColor[] = [];
	const frameRows = Array.from({ length: rowsCount }, (_, index) =>
		frame.slice(index * columnsCount, (index + 1) * columnsCount),
	);
	const frameColumns = Array.from({ length: columnsCount }, (_, index) =>
		frame.filter((_frame, i) => i % columnsCount === index),
	);

	switch (direction) {
		case "up": {
			frameRows.push(frameRows.shift() ?? []);
			newFrame.push(...frameRows.flat());
			break;
		}
		case "down": {
			frameRows.unshift(frameRows.pop() ?? []);
			newFrame.push(...frameRows.flat());
			break;
		}
		case "left": {
			frameColumns.push(frameColumns.shift() ?? []);
			newFrame.push(...transposeLightsMatrix(frameColumns).flat());
			break;
		}
		case "right": {
			frameColumns.unshift(frameColumns.pop() ?? []);
			newFrame.push(...transposeLightsMatrix(frameColumns).flat());
			break;
		}
		case "prev": {
			frame.push(frame.shift() ?? LIGHTS_BACKGROUND_COLOR);
			newFrame.push(...frame);
			break;
		}
		case "next": {
			frame.unshift(frame.pop() ?? LIGHTS_BACKGROUND_COLOR);
			newFrame.push(...frame);
			break;
		}
		case "shuffle": {
			frame.sort(() => secureRandomNumber(10) - 5);
			newFrame.push(...frame);
			break;
		}
		default: {
			newFrame.push(...frame);
			break;
		}
	}

	return newFrame;
};

export const shiftLightsFrameColorPixel = (
	scheme: LightsScheme,
	frameIndex: number,
	direction: ShiftDirection,
	lightsLayout: LightsLayoutOption,
): LightsScheme => {
	const frame = Array.from(
		{ length: lightsLayout.value },
		(_, index) =>
			scheme.frames[frameIndex]?.colors[index] ?? LIGHTS_BACKGROUND_COLOR,
	);

	const newFrame = shiftColorsFrame(
		frame,
		direction,
		lightsLayout.grid.rows,
		lightsLayout.grid.columns,
	);

	return {
		...scheme,
		frames: scheme.frames.map((f, index) =>
			index === frameIndex ? { ...f, colors: newFrame } : f,
		),
	};
};

const resolveColorHue = (color: number): number =>
	((color & LIGHTS_PALLETTE_HUE_MASK) * 360) / LIGHTS_PALLETTE_HUE_MAX;

const resolveColorSaturation = (color: number): number =>
	color % LIGHTS_PALLETTE_HUE_MAX === LIGHTS_PALLETTE_HUE_MASK ? 0 : 50;

const resolveColorLightness = (color: number): number =>
	color === LIGHTS_PALLETTE_HUE_MASK
		? 0
		: 0.5 *
			(((color & LIGHTS_PALLETTE_LIGHTNESS_MASK) >> 6) *
				LIGHTS_PALLETTE_LIGHTNESS_STEP +
				LIGHTS_PALLETTE_LIGHTNESS_BASE);

export const resolveBinaryColorStyle = (color: LightColor): string => {
	const hue = resolveColorHue(color);
	const saturation = resolveColorSaturation(color);
	const lightness = resolveColorLightness(color);

	return `hsl(${hue}deg ${saturation}% ${lightness}%)`;
};
