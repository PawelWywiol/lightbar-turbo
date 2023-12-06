import type { ReactNode } from 'react';

export const uid4 = (): string => Math.random().toString(16).slice(2);

export const uid = (prefix = 'u'): string => `${prefix}${Date.now().toString(16)}${uid4()}`;

export const insecureHash = (input: string): string => {
  let hash = 0;
  for (let index = 0; index < input.length; index++) {
    const char = input.codePointAt(index);
    hash = (hash << 5) - hash + (char ?? 0);
    hash &= hash;
  }
  const uInt32Array = new Uint32Array([hash]);

  if (uInt32Array[0]) {
    return uInt32Array[0].toString(36);
  }

  return input;
};

const cachedElementsUid = new WeakMap<object, string>();

export const getNodeUid = (element: ReactNode | object): string => {
  const emptyNode = typeof element === 'boolean' || element === null || element === undefined;

  if (emptyNode) {
    return '';
  }

  if (typeof element === 'string') {
    return insecureHash(element);
  }

  if (typeof element === 'number') {
    return insecureHash(element.toString());
  }

  if (cachedElementsUid.has(element)) {
    return cachedElementsUid.get(element) ?? '';
  }

  const elementUid = uid();
  cachedElementsUid.set(element, elementUid);

  return elementUid;
};
