import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";

interface TextInputComponentProps {
  ref?: React.MutableRefObject<HTMLDivElement>;
  hint: string;
  onChange?: (currentValue: string) => void;
}

export const TextInputComponent = (
  props: React.PropsWithRef<TextInputComponentProps>
) => {
  const [focused, setFocused] = React.useState(false);
  const style = useTextInputStyle(focused);
  const inputRef: React.MutableRefObject<HTMLInputElement> = React.useRef();

  return (
    <div css={style}>
      {!focused && !inputRef.current?.value && (
        <span className="hint">{props.hint}</span>
      )}
      <input
        ref={inputRef}
        type="text"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

function useTextInputStyle(focused: boolean) {
  const theme = usePageBaseTheme();
  return css`
    label: text-input;
    position: relative;

    padding: ${theme.padding};

    background-color: ${theme.grayscale.background};
    border-bottom: 1px solid
      ${focused ? theme.colors.dark : theme.grayscale.borderOnBackground};

    .hint {
      position: absolute;
      pointer-events: none;
    }

    input {
      outline: none !important;
      border: none;
      background-image: none;
      background-color: transparent;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
    }
  `;
}
