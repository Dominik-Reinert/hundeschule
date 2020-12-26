import * as React from "react";
import { FormStateProps } from "../form/form_state_props";

export enum VALIDATION_TYPE {
  ANY_STRING = "[a-zA-Z]+",
  EMAIL = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
}

export function useFormState(
  initialValue: string,
  validationType: VALIDATION_TYPE,
  errorMessage?: string
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
    console.log(
      `checking if value '${value}' matches regex '${validationType}'`
    );
    if (value.match(new RegExp(validationType, "g")) === null) {
      setError(errorMessage);
      return false;
    }
    return true;
  }, [value]);

  React.useEffect(() => setError(undefined), [value]);

  return [value, setValue, validateValue, { validationErrorMsg: error }];
}
