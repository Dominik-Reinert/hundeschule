import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";

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
  return css`
    label: button;

    padding: ${theme.padding};
    margin: auto;

    text-align: center;

    color: ${theme.grayscale.labelOnColor};
    background-color: ${theme.colors.normal};

    &:hover {
      color: ${theme.grayscale.labelOnColor};
      background-color: ${theme.colors.dark};
    }
  `;
}
