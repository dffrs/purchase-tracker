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

export const getFormElements = <T extends Element>(
  formElements: HTMLFormControlsCollection,
  elements: string[],
) => {
  return elements.map((element) => formElements.namedItem(element) as T | null);
};
