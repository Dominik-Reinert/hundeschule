import * as React from "react";
import { SubmitButtonComponent } from "../button/submit_button_component";
import { FormComponent } from "../form/form_component";
import { FormStateProps } from "../form/form_state_props";
import { DescribedTextInput } from "../text_input/described_text_input";

export const LandingPage = (props) => {
  const [name, setName] = React.useState("");
  const validateName = React.useCallback<() => boolean>(() => {
    if (!name.match(/[a-zA-Z]+/g)) {
      setNameFormState({ validationErrorMsg: "Kein gültiger name!" });
      return false;
    }
    return true;
  }, [name]);
  const handleSubmit = React.useCallback(() => {
    if (validateName()) {
      alert("can submit!");
    } else {
      alert("cant submit!");
    }
  }, [validateName]);
  const [nameFormState, setNameFormState] = React.useState<FormStateProps>({
    required: true,
  });

  return (
    <FormComponent title="Login" onSubmit={handleSubmit}>
      <DescribedTextInput
        description="name"
        hint="name"
        onChange={(newName) => setName(newName)}
        {...nameFormState}
      />
      <SubmitButtonComponent label={"Neue Prüfung erstellen"} />
    </FormComponent>
  );
};
