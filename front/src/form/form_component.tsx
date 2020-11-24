import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";

interface FormComponentProps {}

export const FormComponent = (
  props: React.PropsWithChildren<FormComponentProps>
) => {
  const formStyle = useFormComponentStyle();
  return <div css={formStyle}>{props.children}</div>;
};

const useFormComponentStyle = () => {
  const theme = usePageBaseTheme();
  return css`
    label: form-component;

    border: 1px solid ${theme.grayscale.borderOnBackground};
    min-width: 200px;
    width: fit-content;

    padding: 16px;
    margin: auto;
  `;
};
