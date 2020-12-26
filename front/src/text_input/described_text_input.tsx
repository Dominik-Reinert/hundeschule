import { css } from "@emotion/core";
import * as React from "react";
import { FormStateProps } from "../form/form_state_props";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";
import {
  TextInputComponent,
  TextInputComponentProps,
} from "./text_input_component";

interface DescribedTextInputProps
  extends TextInputComponentProps,
    FormStateProps {
  description: string;
}

export const DescribedTextInput = (
  props: React.PropsWithRef<DescribedTextInputProps>
) => {
  const wrapperStyle = useDescribedTextInputWrapperStyle(
    props.validationErrorMsg !== undefined
  );
  const style = useDescribedTextInputStyle();
  return (
    <span css={wrapperStyle}>
      <div css={style}>
        <span className={`description ${props.required ? "required" : ""}`}>
          {props.description}
        </span>
        <TextInputComponent {...props} />
      </div>
      <div className={`validation-error`}>{props.validationErrorMsg}</div>
    </span>
  );
};

function useDescribedTextInputWrapperStyle(hasError: boolean) {
  const theme = usePageBaseTheme();
  return css`
    label: described-text-input-wrapper;

    .validation-error {
      visibility: ${hasError ? "visible" : "hidden"};
      color: ${theme.colors.error};
      min-height: 20px;

      font-size: ${theme.fonts.additionalInfo.size};
      font-weight: ${theme.fonts.additionalInfo.weight};
      font-style: italic;

      padding: 2px ${theme.padding};
    }
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
