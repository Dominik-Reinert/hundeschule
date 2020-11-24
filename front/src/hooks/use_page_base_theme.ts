import { useTheme } from "emotion-theming";
import { PageBaseTheme } from "../page_base/page_base_theme";

export const usePageBaseTheme = () => useTheme<PageBaseTheme>();
