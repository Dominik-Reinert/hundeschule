import * as React from "react";
import { FormStateProps } from "../form/form_state_props";

export enum VALIDATION_TYPE {
  ANY_STRING = "/[a-zA-Z]+/g",
  EMAIL = "/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g",
}

export function useFormState(
  initialValue: string,
  validationType: VALIDATION_TYPE
): [
  currentValue: string,
  updateValue: (newValue: string) => void,
  validate: () => boolean,
  formState: FormStateProps
] {
  const [value, setValueInt] = React.useState(initialValue);
  const setValue = React.useCallback((newV) => setValueInt(newV), [value]);

  const [error, setError] = React.useState(undefined);

  const validateValue = React.useCallback<() => boolean>(() => {
    if (!value.match(validationType)) {
      setError("Kein gültiger value!");
      return false;
    }
    return true;
  }, [value]);

  React.useEffect(() => setError(undefined), [value]);

  return [value, setValue, validateValue, { validationErrorMsg: error }];
}
