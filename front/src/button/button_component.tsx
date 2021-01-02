import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";
import { useSharedButtonStyle } from "./shared_button_style";

interface ButtonComponentProps {
  ref?: React.MutableRefObject<HTMLButtonElement>;
  label: string;
  secondary?: boolean;
  onClick?: () => void;
}

export const ButtonComponent = (
  props: React.PropsWithRef<ButtonComponentProps>
) => {
  const style = useButtonComponentStyle(props.secondary);
  return (
    <button
      ref={props.ref}
      type="button"
      css={style}
      onClick={() => props.onClick?.()}
    >
      {props.label}
    </button>
  );
};

function useButtonComponentStyle(secondary?: boolean) {
  const theme = usePageBaseTheme();
  const sharedStyle = useSharedButtonStyle(secondary);
  return css`
    label: button;

    ${sharedStyle}
  `;
}
