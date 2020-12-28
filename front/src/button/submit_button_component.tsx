import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";
import { useSharedButtonStyle } from "./shared_button_style";

interface SubmitButtonComponentProps {
  label: string;
}

export const SubmitButtonComponent = (
  props: React.PropsWithRef<SubmitButtonComponentProps>
) => {
  const style = useSubmitButtonComponentStyle();
  return (
    <button css={style} type="submit" onClick={() => false}>
      {props.label}
    </button>
  );
};

function useSubmitButtonComponentStyle() {
  const theme = usePageBaseTheme();
  const sharedStyle = useSharedButtonStyle();
  return css`
    label: submitbutton;
    border: none;
    outline: none;

    ${sharedStyle}
  `;
}
