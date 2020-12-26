import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";

export interface TextInputComponentProps {
  ref?: React.MutableRefObject<HTMLDivElement>;
  hint: string;
  renderAsPasswd?: boolean;
  onChange?: (currentValue: string) => void;
}

export const TextInputComponent = (
  props: React.PropsWithRef<TextInputComponentProps>
) => {
  const [focused, setFocused] = React.useState(false);
  const style = useTextInputStyle(focused);
  const inputRef: React.MutableRefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
    undefined as any
  );
  const handleChange = React.useCallback(
    (evt) => props.onChange?.(evt.target.value),
    [props.onChange]
  );

  return (
    <div css={style}>
      {!focused && !inputRef.current?.value && (
        <span className="hint">{props.hint}</span>
      )}
      <input
        ref={inputRef}
        type={props.renderAsPasswd ? "password" : "text"}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
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

    min-width: 220px;

    .hint {
      position: absolute;
      pointer-events: none;

      font-style: italic;
      color: ${theme.grayscale.labelOnBackground};
    }

    input {
      outline: none !important;
      border: none;
      background-image: none;
      background-color: transparent;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      width: 100%;
    }
  `;
}
