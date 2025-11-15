export const getNumberOfDecimals = (value: unknown): number => {
  const errorValue = -1;

  if (value == null) return errorValue;

  try {
    const numberOfDecimals = String(value).split(/\.|\,/)[1];

    if (numberOfDecimals == null) return errorValue;
    return numberOfDecimals.length;
  } catch (error) {
    console.error("[Error-getNumberOfDecimals]: " + error);
    return errorValue;
  }
};

export function getFormElements<T extends Element>(
  formElements: HTMLFormControlsCollection,
  elements: string,
): T | null;
export function getFormElements<T extends Element>(
  formElements: HTMLFormControlsCollection,
  elements: string[],
): Array<T | null>;
export function getFormElements<T extends Element>(
  formElements: HTMLFormControlsCollection,
  elements: any,
) {
  if (!Array.isArray(elements)) return formElements.namedItem(elements);

  return elements.map((element) => formElements.namedItem(element) as T | null);
}
