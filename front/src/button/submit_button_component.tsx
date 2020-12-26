import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";

interface SubmitButtonComponentProps {
  label: string;
}

export const SubmitButtonComponent = (
  props: React.PropsWithRef<SubmitButtonComponentProps>
) => {
  const style = useSubmitButtonComponentStyle();
  return (
    <button css={style} type="submit">
      {props.label}
    </button>
  );
};

function useSubmitButtonComponentStyle() {
  const theme = usePageBaseTheme();
  return css`
    label: submitbutton;

    padding: ${theme.padding};
    margin: auto;
    cursor: pointer;

    text-align: center;
    border: none;
    outline: none;

    color: ${theme.grayscale.labelOnColor};
    background-color: ${theme.colors.normal};

    &:hover {
      color: ${theme.grayscale.labelOnColor};
      background-color: ${theme.colors.dark};
    }
  `;
}
