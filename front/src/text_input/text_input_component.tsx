import { css } from "@emotion/core";
import * as React from "react";
import { FormStateProps } from "../form/form_state_props";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";

export interface TextInputComponentProps extends FormStateProps {
  ref?: React.MutableRefObject<HTMLDivElement>;
  hint: string;
  renderAsPasswd?: boolean;
  onChange?: (currentValue: string) => void;
}

export const TextInputComponent = (
  props: React.PropsWithRef<TextInputComponentProps>
) => {
  const [focused, setFocused] = React.useState(false);
  const style = useTextInputStyle(
    focused,
    props.validationErrorMsg !== undefined
  );
  const inputRef: React.MutableRefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
    undefined as any
  );
  const handleChange = React.useCallback(
    (evt) => props.onChange?.(evt.target.value),
    [props.onChange]
  );

  return (
    <div css={style}>
      <div className="text-input-wrapper">
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
      <div className={`validation-error`}>{props.validationErrorMsg}</div>
    </div>
  );
};

function useTextInputStyle(focused: boolean, hasError: boolean) {
  const theme = usePageBaseTheme();
  return css`
    label: text-input;

    .text-input-wrapper {
      position: relative;

      padding: ${theme.padding};

      border-radius: ${theme.borderRadius};

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
    }
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
