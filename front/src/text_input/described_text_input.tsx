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
  const style = useDescribedTextInputStyle();
  return (
    <div css={style}>
      <span className={`description ${props.required ? "required" : ""}`}>
        {props.description}
      </span>
      <TextInputComponent {...props} />
    </div>
  );
};
function useDescribedTextInputStyle() {
  const theme = usePageBaseTheme();
  return css`
    labeld: described-text-input;

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
