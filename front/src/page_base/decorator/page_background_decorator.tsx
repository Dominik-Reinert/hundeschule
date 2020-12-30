import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../../hooks/use_page_base_theme";

export const PageBackgroundDecorator = (props: React.PropsWithChildren<{}>) => {
  const style = usePageBackgroundStyle();
  return <div css={style}>{props.children}</div>;
};

function usePageBackgroundStyle() {
  const theme = usePageBaseTheme();
  return css`
    label: page-background-decorator;

    background-color: ${theme.grayscale.background};
  `;
}
