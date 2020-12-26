import * as React from "react";
import { SubmitButtonComponent } from "../button/submit_button_component";
import { FormComponent } from "../form/form_component";
import { useFormState, VALIDATION_TYPE } from "../hooks/use_form_state";
import { DescribedTextInput } from "../text_input/described_text_input";

export const LandingPage = (props) => {
  const [
    firstName,
    setFirstName,
    validateFirstName,
    firstNameFormState,
  ] = useFormState("", VALIDATION_TYPE.ANY_STRING);
  const [name, setName, validateName, nameFormState] = useFormState(
    "",
    VALIDATION_TYPE.ANY_STRING
  );
  const handleSubmit = React.useCallback(
    (evt) => {
      evt.preventDefault();

      if ([validateName(), validateFirstName()].every((value) => value)) {
      }
    },
    [name, firstName]
  );

  return (
    <FormComponent title="Login" onSubmit={handleSubmit}>
      <DescribedTextInput
        description="name"
        hint="name"
        onChange={(newName) => setName(newName)}
        {...nameFormState}
        required={true}
      />
      <DescribedTextInput
        description="first name"
        hint="first name"
        onChange={(newName) => setFirstName(newName)}
        {...firstNameFormState}
        required={true}
      />
      <SubmitButtonComponent label={"Neue Prüfung erstellen"} />
    </FormComponent>
  );
};
