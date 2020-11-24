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
  const style = useDescribedTextInputStyle();
  return (
    <div css={style}>
      <span className="description">{props.description}</span>
      <TextInputComponent hint={props.hint} />
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
    }
  `;
}
