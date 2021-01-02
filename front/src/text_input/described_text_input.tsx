import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";
import {
  TextInputComponent,
  TextInputComponentProps,
} from "./text_input_component";

interface DescribedTextInputProps extends TextInputComponentProps {
  description: string;
}

export const DescribedTextInput = (
  props: React.PropsWithRef<DescribedTextInputProps>
) => {
  const wrapperStyle = useDescribedTextInputWrapperStyle();
  const style = useDescribedTextInputStyle();
  return (
    <span css={wrapperStyle}>
      <div css={style}>
        <span className={`description ${props.required ? "required" : ""}`}>
          {props.description}
        </span>
        <TextInputComponent {...props} />
      </div>
    </span>
  );
};

function useDescribedTextInputWrapperStyle() {
  const theme = usePageBaseTheme();
  return css`
    label: described-text-input-wrapper;
  `;
}

function useDescribedTextInputStyle() {
  const theme = usePageBaseTheme();
  return css`
    label: described-text-input;

    display: flex;
    justify-content: space-between;

    .description {
      padding: ${theme.padding};

      &.required:after {
        content: " *";
        color: ${theme.colors.normal};
      }
    }
  `;
}
