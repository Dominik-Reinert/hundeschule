import * as React from "react";
import { PageBackgroundDecorator } from "./decorator/page_background_decorator";
import { PageFontDecorator } from "./decorator/page_font_decora";
import { PageFooterDecorator } from "./decorator/page_footer_decorator";
import { PageBaseThemeProvider } from "./page_base_theme_provider";

interface PageBaseProps {}

export const PageBase: React.FunctionComponent<PageBaseProps> = ({
  children,
}) => {
  return (
    <PageBaseThemeProvider>
      <PageFontDecorator>
        <PageBackgroundDecorator>
          <PageFooterDecorator>{children}</PageFooterDecorator>
        </PageBackgroundDecorator>
      </PageFontDecorator>
    </PageBaseThemeProvider>
  );
};
