import { css } from "@emotion/core";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";

export const useSharedButtonStyle = () => {
  const theme = usePageBaseTheme();
  return css`
    label: shared-button;

    padding: ${theme.padding};
    margin: auto;
    cursor: pointer;

    text-align: center;

    color: ${theme.grayscale.labelOnColor};
    background-color: ${theme.colors.normal};

    font-size: ${theme.fonts.button.size};
    font-weight: ${theme.fonts.button.weight};

    &:hover {
      color: ${theme.grayscale.labelOnColor};
      background-color: ${theme.colors.dark};
    }
  `;
};
