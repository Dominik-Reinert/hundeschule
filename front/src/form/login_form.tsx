import * as React from "react";
import { useHistory } from "react-router-dom";
import { useFormState, VALIDATION_TYPE } from "../hooks/use_form_state";
import { postRequest } from "../request/post_request";
import { TextInputComponent } from "../text_input/text_input_component";
import { FormComponent } from "./form_component";

export interface LoginFormProps {
  onGoToRegisterClick?: () => void;
}

export const LoginForm = (props: LoginFormProps) => {
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
  const history = useHistory();
  const handleSubmit = React.useCallback(
    async (evt) => {
      evt.preventDefault();
      if ([validatePassword(), validateEmail()].every((value) => value)) {
        await postRequest({
          url: "http://localhost:3000/login",
          data: { email, password },
          config: {
            headers: {
              "Content-Type": "application/json",
            },
          },
          redirect: (url) => history.push(url),
        });
      }
    },
    [password, email]
  );
  return (
    <FormComponent
      title="Login"
      submitButtonLabel="Login"
      secondaryControlLabel={"Register"}
      onSubmit={handleSubmit}
      onSecondaryControlClick={props.onGoToRegisterClick}
    >
      <TextInputComponent
        hint="enter your email adress"
        onChange={(newEmail) => setEmail(newEmail)}
        {...emailFormState}
        required={true}
      />
      <TextInputComponent
        hint="password"
        onChange={(newPassword) => setPassword(newPassword)}
        {...passwordFormState}
        renderAsPasswd={true}
        required={true}
      />
    </FormComponent>
  );
};
