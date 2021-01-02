import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";
import { useSharedButtonStyle } from "./shared_button_style";

interface SubmitButtonComponentProps {
  label: string;
  secondary?: boolean;
}

export const SubmitButtonComponent = (
  props: React.PropsWithRef<SubmitButtonComponentProps>
) => {
  const style = useSubmitButtonComponentStyle(props.secondary);
  return (
    <button css={style} type="submit" onClick={() => false}>
      {props.label}
    </button>
  );
};

function useSubmitButtonComponentStyle(secondary?: boolean) {
  const theme = usePageBaseTheme();
  const sharedStyle = useSharedButtonStyle(secondary);
  return css`
    label: submitbutton;

    ${sharedStyle}
  `;
}
