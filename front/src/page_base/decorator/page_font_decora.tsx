import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../../hooks/use_page_base_theme";

export const PageFontDecorator = (props: React.PropsWithChildren<{}>) => {
  const style = usePageFontStyle();
  return <div css={style}>{props.children}</div>;
};

function usePageFontStyle() {
  const theme = usePageBaseTheme();
  return css`
    label: page-font-decorator;

    * {
      font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans,
        Tahoma, sans-serif;
    }
  `;
}
