import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";
import { useSharedButtonStyle } from "./shared_button_style";

interface ButtonComponentProps {
  ref?: React.MutableRefObject<HTMLDivElement>;
  label: string;
  onClick?: () => void;
}

export const ButtonComponent = (
  props: React.PropsWithRef<ButtonComponentProps>
) => {
  const style = useButtonComponentStyle();
  return (
    <div ref={props.ref} css={style} onClick={() => props.onClick?.()}>
      {props.label}
    </div>
  );
};

function useButtonComponentStyle() {
  const theme = usePageBaseTheme();
  const sharedStyle = useSharedButtonStyle();
  return css`
    label: button;

    ${sharedStyle}
  `;
}
