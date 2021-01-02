import axios from "axios";
import * as React from "react";
import { useFormState, VALIDATION_TYPE } from "../hooks/use_form_state";
import { TextInputComponent } from "../text_input/text_input_component";
import { FormComponent } from "./form_component";

export interface RegisterFormProps {
  onGoToLoginClick: () => void;
}

export const RegisterForm = (props: RegisterFormProps) => {
  const [
    firstName,
    setFirstName,
    validateFirstName,
    firstNameFormState,
  ] = useFormState(
    "",
    VALIDATION_TYPE.ANY_STRING,
    "Please enter your first name!"
  );
  const [
    lastName,
    setLastName,
    validateLastName,
    lastNameFormState,
  ] = useFormState(
    "",
    VALIDATION_TYPE.ANY_STRING,
    "Please enter your last name!"
  );
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
    setCustomPasswortFormError,
  ] = useFormState(
    "",
    VALIDATION_TYPE.PASSWORD_DEFINITION,
    "Please enter your password!"
  );
  const [
    confirmPassword,
    setConfirmPassword,
    validateConfirmPassword,
    confirmPasswordFormState,
    setCustomConfirmPasswortFormError,
  ] = useFormState(
    "",
    VALIDATION_TYPE.PASSWORD_DEFINITION,
    "Please confirm your password!"
  );

  const handleLogin = React.useCallback(
    async (evt) => {
      evt.preventDefault();
      if (
        [
          validateFirstName(),
          validateLastName(),
          validateEmail(),
          validatePassword(),
          validateConfirmPassword(),
        ].every((value) => value)
      ) {
        if (password === confirmPassword) {
          const response = await axios.post(
            "http://localhost:3000/register",
            { email, password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          alert(`submitted login, got response: ${JSON.stringify(response)}`);
        } else {
          setPassword("");
          setConfirmPassword("");
          setCustomPasswortFormError("Passwords did not match!");
          setCustomConfirmPasswortFormError("Passwords did not match!");
        }
      } else {
        setPassword("");
        setConfirmPassword("");
      }
    },
    [firstName, lastName, email, password, confirmPassword]
  );
  return (
    <FormComponent
      title="Register"
      submitButtonLabel="Register"
      secondaryControlLabel={"Login"}
      onSubmit={handleLogin}
      onSecondaryControlClick={props.onGoToLoginClick}
    >
      <TextInputComponent
        hint="first name"
        onChange={(newFirstName) => setFirstName(newFirstName)}
        {...firstNameFormState}
        required={true}
      />
      <TextInputComponent
        hint="last name"
        onChange={(newLastName) => setLastName(newLastName)}
        {...lastNameFormState}
        required={true}
      />
      <TextInputComponent
        hint="enter your email adress"
        onChange={(newEmail) => setEmail(newEmail)}
        {...emailFormState}
        required={true}
      />
      <TextInputComponent
        hint="*****"
        onChange={(newPassword) => setPassword(newPassword)}
        {...passwordFormState}
        renderAsPasswd={true}
        required={true}
      />
      <TextInputComponent
        hint="*****"
        onChange={(newPassword) => setConfirmPassword(newPassword)}
        {...confirmPasswordFormState}
        renderAsPasswd={true}
        required={true}
      />
    </FormComponent>
  );
};
