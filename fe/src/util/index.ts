export const EMAIL_VALIDATION =
  /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;

export const PT_PHONE_NUMBER = /^(\+351)?\d{9|13}$/g;

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

export const nonEmptyOrNull = (arg: string | undefined | null) => {
  if (arg === "" || arg == null) return null;
  return arg;
};

export function getFormElements<T extends Element>(
  form: HTMLFormElement,
  element: string,
): Array<T | null>;
export function getFormElements<T extends Element>(
  formElements: HTMLFormControlsCollection,
  element: string,
): T | null;
export function getFormElements<T extends Element>(
  formElements: HTMLFormControlsCollection,
  elements: string[],
): Array<T | null>;
export function getFormElements<T extends Element>(
  formOrCollection: any,
  elements: any,
) {
  if (
    formOrCollection instanceof HTMLFormElement &&
    typeof elements === "string"
  )
    return formOrCollection.querySelectorAll(elements);

  if (!Array.isArray(elements)) return formOrCollection.namedItem(elements);

  return elements.map(
    (element) => formOrCollection.namedItem(element) as T | null,
  );
}

const removeError = (el: HTMLInputElement) => {
  // if radio input, remove highlight from label
  if (el.tagName === "INPUT" && el.type === "radio") {
    el.parentElement?.classList.remove("!text-error");
    return;
  }

  el.classList.remove("!border-error");
  return;
};

const addError = (el: HTMLInputElement) => {
  // if radio input, highlight label
  if (el.tagName === "INPUT" && el.type === "radio") {
    el.parentElement?.classList.add("!text-error");
    return;
  }

  el.classList.add("!border-error");
  return;
};

export const validateFields = (form: HTMLFormElement) => {
  const allInputs = getFormElements<HTMLInputElement>(form, "input");

  allInputs.forEach((el) => {
    if (el == null) return;

    if (el.validity.valid) removeError(el);
    else addError(el);
  });
};
