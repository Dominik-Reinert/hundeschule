import * as React from "react";
import { PageBaseThemeProvider } from "./page_base_theme_provider";

interface PageBaseProps {}

export const PageBase: React.FunctionComponent<PageBaseProps> = ({
  children,
}) => {
  return <PageBaseThemeProvider>{children}</PageBaseThemeProvider>;
};
