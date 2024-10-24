import { useCallback, useEffect, useRef } from 'react';
import type { RefObject } from 'react';

import { rafTimeout } from 'utils/rafTimeout';

export interface GridPainterState {
  offsetStart: number;
  offsetCurrent: number;
  offsetTarget: number;
  animationId: number;
  animationTime: number;
  animationDuration: number;
  dragStartOffsetX: number;
  dragDistanceX: number;
  dragLastOffsetX: number;
  dragStartOffsetY: number;
  dragDistanceY: number;
  dragLastOffsetY: number;
  isDragStarted: boolean;
  isDragging: boolean;
  dragged: boolean;
  itemIndex: number;
}

const MINIMUM_DRAG_DISTANCE = 0;

export const DEFAULT_PAINTER_STATE: GridPainterState = {
  offsetStart: 0,
  offsetCurrent: 0,
  offsetTarget: 0,
  animationId: 0,
  animationTime: 0,
  animationDuration: 0,
  dragStartOffsetX: 0,
  dragDistanceX: 0,
  dragLastOffsetX: 0,
  dragStartOffsetY: 0,
  dragDistanceY: 0,
  dragLastOffsetY: 0,
  isDragStarted: false,
  isDragging: false,
  dragged: false,
  itemIndex: -1,
};

const getPositionFromEvent = (event: Event): { offsetX: number; offsetY: number } => {
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

const getChildElementFromPoint = (x: number, y: number, parent: HTMLDivElement): number => {
  const element = document?.elementFromPoint(x, y);
  if (!element) {
    return -1;
  }

  const children = [...parent.children];
  return children.indexOf(element);
};

const setChildElementBackgroundColor = (
  index: number,
  color: string,
  parent: HTMLDivElement,
): void => {
  const children = [...parent.children];
  const element = children[index] as HTMLDivElement;
  element?.style.setProperty('background', color);
};

export const useGridPainter = (
  containerReference: RefObject<HTMLDivElement>,
  color: string,
  onComplete: (colorIndexes: number[]) => void,
) => {
  const colorIndexes = useRef<number[]>([]);
  const stateObject = useRef<GridPainterState>(DEFAULT_PAINTER_STATE);
  const onDragStart = useCallback(
    (event: Event) => {
      const currentReferenceContainer = containerReference.current;

      if (!currentReferenceContainer) {
        return;
      }

      const state = stateObject;
      const { offsetX, offsetY } = getPositionFromEvent(event);

      state.current.isDragStarted = true;
      state.current.isDragging = false;
      state.current.dragged = false;
      state.current.dragStartOffsetX = offsetX;
      state.current.dragLastOffsetX = offsetX;
      state.current.dragStartOffsetY = offsetY;
      state.current.dragLastOffsetY = offsetY;
      state.current.offsetStart = state.current.offsetCurrent || 0;
      state.current.animationTime = 0;

      colorIndexes.current = [];
      state.current.itemIndex = getChildElementFromPoint(
        offsetX,
        offsetY,
        currentReferenceContainer,
      );

      if (state.current.itemIndex === -1) {
        return;
      }

      colorIndexes.current = [state.current.itemIndex];

      rafTimeout(() => {
        setChildElementBackgroundColor(state.current.itemIndex, color, currentReferenceContainer);
      });
    },
    [containerReference, stateObject, color],
  );

  const onDragMove = useCallback(
    (event: Event) => {
      const currentReferenceContainer = containerReference.current;

      if (!currentReferenceContainer) {
        return;
      }

      const state = stateObject;
      const { offsetX, offsetY } = getPositionFromEvent(event);

      if (!state.current.isDragStarted) {
        return;
      }

      state.current.dragDistanceX = (state.current.dragStartOffsetX || offsetX) - offsetX;
      state.current.dragDistanceY = (state.current.dragStartOffsetY || offsetY) - offsetY;

      state.current.dragLastOffsetX = offsetX;
      state.current.dragLastOffsetY = offsetY;

      if (
        !state.current.isDragging &&
        Math.abs(state.current.dragDistanceX) < MINIMUM_DRAG_DISTANCE
      ) {
        if (Math.abs(state.current.dragDistanceY) < MINIMUM_DRAG_DISTANCE) {
          state.current.isDragStarted = false;
        }
        return;
      }

      state.current.isDragging = true;
      state.current.dragged = !!state.current.dragDistanceX;
      state.current.offsetCurrent = state.current.offsetStart + state.current.dragDistanceX;
      state.current.offsetTarget = state.current.offsetCurrent;

      state.current.itemIndex = getChildElementFromPoint(
        offsetX,
        offsetY,
        currentReferenceContainer,
      );

      event.preventDefault();

      if (
        state.current.itemIndex === -1 ||
        colorIndexes.current.includes(state.current.itemIndex)
      ) {
        return;
      }

      colorIndexes.current.push(state.current.itemIndex);

      setChildElementBackgroundColor(state.current.itemIndex, color, currentReferenceContainer);
    },
    [containerReference, stateObject, color],
  );

  const onDragEnd = useCallback(
    (event: Event) => {
      const state = stateObject;

      if (!state.current.isDragStarted) {
        return;
      }

      state.current.isDragStarted = false;
      state.current.animationTime = 0;
      state.current.isDragging = false;

      event.preventDefault();

      onComplete(colorIndexes.current);

      rafTimeout(() => {
        state.current.dragged = false;
      });
    },
    [stateObject, onComplete],
  );

  const onClick = useCallback(
    (event: Event) => {
      const state = stateObject;

      if (state.current.dragged) {
        state.current.dragged = false;
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    [stateObject],
  );

  const preventDragStart = (dragStartEvent: Event) => dragStartEvent.preventDefault();

  useEffect(() => {
    const currentReferenceContainer = containerReference.current;

    globalThis?.addEventListener('mouseup', onDragEnd);
    globalThis?.addEventListener('touchend', onDragEnd, { passive: false });
    globalThis?.addEventListener('mousemove', onDragMove);
    globalThis?.addEventListener('touchmove', onDragMove, { passive: false });

    currentReferenceContainer?.addEventListener('mousedown', onDragStart);
    currentReferenceContainer?.addEventListener('touchstart', onDragStart);
    currentReferenceContainer?.addEventListener('dragstart', preventDragStart);
    currentReferenceContainer?.addEventListener('click', onClick, { passive: false });

    return () => {
      globalThis?.removeEventListener('mouseup', onDragEnd);
      globalThis?.removeEventListener('touchend', onDragEnd);
      globalThis?.removeEventListener('mousemove', onDragMove);
      globalThis?.removeEventListener('touchmove', onDragMove);

      currentReferenceContainer?.removeEventListener('mousedown', onDragStart);
      currentReferenceContainer?.removeEventListener('touchstart', onDragStart);
      currentReferenceContainer?.removeEventListener('dragstart', preventDragStart);
      currentReferenceContainer?.removeEventListener('click', onClick);
    };
  }, [containerReference, onDragStart, onDragMove, onDragEnd, onClick]);
};
