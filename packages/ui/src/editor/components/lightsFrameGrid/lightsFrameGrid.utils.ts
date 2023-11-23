import { RefObject, MutableRefObject, useCallback, useEffect } from 'react';

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

const MINIMUM_DRAG_DISTANCE = 5;

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

const rafTimeout = (callback: () => void, timeout = 0): void => {
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

const getChildElementFromPoint = (x: number, y: number, parent: HTMLDivElement): number => {
  const element = document?.elementFromPoint(x, y);
  if (!element) {
    return -1;
  }
  const children = Array.from(parent.children);
  return children.indexOf(element);
};

export const useGridPainter = (
  containerReference: RefObject<HTMLDivElement>,
  stateObject: MutableRefObject<GridPainterState>,
  onUpdateState: (state: GridPainterState) => void,
  onComplete: () => void,
) => {
  const onDragStart = useCallback(
    (event: Event) => {
      const currentReferenceContainer = containerReference.current;

      if (!currentReferenceContainer) {
        return;
      }

      const state = stateObject;
      const mouseEvent = event as MouseEvent;
      const touchEvent = event as TouchEvent;

      const offsetX = touchEvent.touches?.length
        ? touchEvent.touches[0]?.clientX ?? 0
        : mouseEvent.clientX || 0;
      const offsetY = touchEvent.touches?.length
        ? touchEvent.touches[0]?.clientY ?? 0
        : mouseEvent.clientY || 0;

      state.current.isDragStarted = true;
      state.current.isDragging = false;
      state.current.dragged = false;
      state.current.dragStartOffsetX = offsetX;
      state.current.dragLastOffsetX = offsetX;
      state.current.dragStartOffsetY = offsetY;
      state.current.dragLastOffsetY = offsetY;
      state.current.offsetStart = state.current.offsetCurrent || 0;
      state.current.animationTime = 0;
      state.current.itemIndex = getChildElementFromPoint(
        offsetX,
        offsetY,
        currentReferenceContainer,
      );

      rafTimeout(() => {
        state.current.itemIndex !== -1 && onUpdateState(state.current);
      });
    },
    [stateObject],
  );

  const onDragMove = useCallback(
    (event: Event) => {
      const currentReferenceContainer = containerReference.current;

      if (!currentReferenceContainer) {
        return;
      }

      const state = stateObject;
      const mouseEvent = event as MouseEvent;
      const touchEvent = event as TouchEvent;

      if (!state.current.isDragStarted) {
        return;
      }

      const offsetX = touchEvent.touches?.length
        ? touchEvent.touches[0]?.clientX ?? 0
        : mouseEvent.clientX || 0;
      const offsetY = touchEvent.touches?.length
        ? touchEvent.touches[0]?.clientY ?? 0
        : mouseEvent.clientY || 0;

      state.current.dragDistanceX = (state.current.dragStartOffsetX || offsetX) - offsetX;
      state.current.dragDistanceY = (state.current.dragStartOffsetY || offsetY) - offsetY;

      state.current.dragLastOffsetX = offsetX;
      state.current.dragLastOffsetY = offsetY;

      if (
        !state.current.isDragging &&
        Math.abs(state.current.dragDistanceX) < MINIMUM_DRAG_DISTANCE
      ) {
        if (Math.abs(state.current.dragDistanceY) > MINIMUM_DRAG_DISTANCE) {
          state.current.isDragStarted = false;
        }
        return;
      }

      state.current.isDragging = true;
      state.current.dragged = !!state.current.dragDistanceX;
      state.current.offsetCurrent = state.current.offsetStart + state.current.dragDistanceX;
      state.current.offsetTarget = state.current.offsetCurrent;

      const lastItemIndex = state.current.itemIndex;
      state.current.itemIndex = getChildElementFromPoint(
        offsetX,
        offsetY,
        currentReferenceContainer,
      );

      event.preventDefault();

      rafTimeout(() => {
        state.current.itemIndex !== -1 &&
          lastItemIndex !== state.current.itemIndex &&
          onUpdateState(state.current);
      });
    },
    [stateObject, onUpdateState],
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

      if (!state.current.dragged) {
        return;
      }

      event.preventDefault();

      onComplete();

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

    window?.addEventListener('mouseup', onDragEnd);
    window?.addEventListener('touchend', onDragEnd, { passive: false });
    window?.addEventListener('mousemove', onDragMove);
    window?.addEventListener('touchmove', onDragMove, { passive: false });

    currentReferenceContainer?.addEventListener('mousedown', onDragStart);
    currentReferenceContainer?.addEventListener('touchstart', onDragStart);
    currentReferenceContainer?.addEventListener('dragstart', preventDragStart);
    currentReferenceContainer?.addEventListener('click', onClick, { passive: false });

    return () => {
      window?.removeEventListener('mouseup', onDragEnd);
      window?.removeEventListener('touchend', onDragEnd);
      window?.removeEventListener('mousemove', onDragMove);
      window?.removeEventListener('touchmove', onDragMove);

      currentReferenceContainer?.removeEventListener('mousedown', onDragStart);
      currentReferenceContainer?.removeEventListener('touchstart', onDragStart);
      currentReferenceContainer?.removeEventListener('dragstart', preventDragStart);
      currentReferenceContainer?.removeEventListener('click', onClick);
    };
  }, [
    containerReference,
    stateObject,
    onUpdateState,
    onComplete,
    onDragStart,
    onDragMove,
    onDragEnd,
    onClick,
  ]);
};
