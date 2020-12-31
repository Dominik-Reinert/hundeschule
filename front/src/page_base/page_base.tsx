import * as React from "react";
import { PageBackgroundDecorator } from "./decorator/page_background_decorator";
import { PageFontDecorator } from "./decorator/page_font_decorator";
import { PageFooterDecorator } from "./decorator/page_footer_decorator";
import { PageNotificationDecorator } from "./decorator/page_notification_decorator";
import { PageBaseThemeProvider } from "./page_base_theme_provider";

interface PageBaseProps {}

export const PageBase: React.FunctionComponent<PageBaseProps> = ({
  children,
}) => {
  return (
    <PageBaseThemeProvider>
      <PageFontDecorator>
        <PageBackgroundDecorator>
          <PageNotificationDecorator>
            <PageFooterDecorator>{children}</PageFooterDecorator>
          </PageNotificationDecorator>
        </PageBackgroundDecorator>
      </PageFontDecorator>
    </PageBaseThemeProvider>
  );
};
