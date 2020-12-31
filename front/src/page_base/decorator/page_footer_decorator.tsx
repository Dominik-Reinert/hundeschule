import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../../hooks/use_page_base_theme";

export const PageFooterDecorator = (props: React.PropsWithChildren<{}>) => {
  const style = usePageFooterStyle();
  return (
    <div css={style}>
      <div className="page-content">{props.children}</div>
      <div className="page-footer-wrapper">
        <footer className="page-footer">
          <div>Impressum</div>
          <div>Privacy</div>
          <div>Project github page</div>
        </footer>
      </div>
    </div>
  );
};

function usePageFooterStyle() {
  const theme = usePageBaseTheme();
  return css`
    label: page-footer-decorator;

    .page-content {
      min-height: calc(98vh - 50px);
      margin-bottom: -50px;

      > * {
        height: 100vh;
      }
    }

    .page-footer-wrapper {
      padding: 0 ${theme.padding};
    }

    .page-footer {
      height: 49px;
      border-top: 1px solid ${theme.grayscale.borderOnBackground};

      display: flex;
      justify-content: space-evenly;
      align-items: center;

      font-size: ${theme.fonts.outline.size};
      font-weight: ${theme.fonts.outline.weight};
    }
  `;
}
