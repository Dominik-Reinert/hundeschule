import * as React from "react";
import { LoginForm } from "../form/login_form";
import { RegisterForm } from "../form/register_form";

enum CurrentForm {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}

export const LoginPage = (props) => {
  const [form, setForm] = React.useState(CurrentForm.REGISTER);
  const handleGoToLogin = React.useCallback(() => setForm(CurrentForm.LOGIN), [
    form,
  ]);
  const handleGoToRegister = React.useCallback(
    () => setForm(CurrentForm.REGISTER),
    [form]
  );
  return (
    <div>
      {form === CurrentForm.REGISTER && (
        <RegisterForm onGoToLoginClick={handleGoToLogin} />
      )}
      {form === CurrentForm.LOGIN && (
        <LoginForm onGoToRegisterClick={handleGoToRegister} />
      )}
    </div>
  );
};
