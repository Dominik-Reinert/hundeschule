import { css } from "@emotion/core";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";

export const useSharedButtonStyle = (secondary?: boolean) => {
  const theme = usePageBaseTheme();
  return css`
    label: shared-button;

    padding: ${theme.padding};
    margin: auto;
    cursor: pointer;

    text-align: center;
    min-height: 45px;

    border: none;
    outline: none;

    border-radius: ${theme.borderRadius};

    color: ${theme.grayscale.labelOnColor};
    background-color: ${secondary
      ? theme.colors.secondaryNormal
      : theme.colors.normal};

    font-size: ${theme.fonts.button.size};
    font-weight: ${theme.fonts.button.weight};

    &:hover {
      color: ${theme.grayscale.labelOnColor};
      background-color: ${secondary
        ? theme.colors.secondaryDark
        : theme.colors.dark};
    }
  `;
};
