import * as React from "react";
import { SubmitButtonComponent } from "../button/submit_button_component";
import { FormComponent } from "../form/form_component";
import { useFormState, VALIDATION_TYPE } from "../hooks/use_form_state";
import { DescribedTextInput } from "../text_input/described_text_input";

export const LoginPage = (props) => {
  const [email, setEmail, validateEmail, emailFormState] = useFormState(
    "",
    VALIDATION_TYPE.EMAIL,
    "Please enter a valid email adresse!"
  );
  const [
    password,
    setPassword,
    validatePassword,
    passwordFormState,
  ] = useFormState(
    "",
    VALIDATION_TYPE.PASSWORD_INPUT,
    "Please enter your password!"
  );
  const handleSubmit = React.useCallback(
    (evt) => {
      evt.preventDefault();
      if ([validatePassword(), validateEmail()].every((value) => value)) {
        fetch({"http://localhost:3000/login"})
        alert("submitting....");
      }
    },
    [password, email]
  );

  return (
    <FormComponent title="Login" onSubmit={handleSubmit}>
      <DescribedTextInput
        description="email"
        hint="enter your email adress"
        onChange={(newEmail) => setEmail(newEmail)}
        {...emailFormState}
        required={true}
      />
      <DescribedTextInput
        description="password"
        hint="*****"
        onChange={(newPassword) => setPassword(newPassword)}
        {...passwordFormState}
        required={true}
      />
      <SubmitButtonComponent label={"Login"} />
    </FormComponent>
  );
};
