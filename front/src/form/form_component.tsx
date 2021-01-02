import { css } from "@emotion/core";
import * as React from "react";
import { SubmitButtonComponent } from "../button/submit_button_component";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";

interface FormComponentProps {
  title: string;
  submitButtonLabel: string;
  headerButton?: {
    label: string;
    onClick: () => void;
  };
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const FormComponent = (
  props: React.PropsWithChildren<FormComponentProps>
) => {
  const formStyle = useFormComponentStyle(React.Children.count(props.children));
  return (
    <form css={formStyle} onSubmit={props.onSubmit} noValidate>
      {props.headerButton && (
        <div className="header-button" onClick={props.headerButton.onClick}>
          {props.headerButton.label}
        </div>
      )}
      <div className="title">{props.title}</div>
      {React.Children.map(props.children, (child) => (
        <div className="wrapped-child">{child}</div>
      ))}
      <div className="controls">
        <SubmitButtonComponent label={props.submitButtonLabel} />
      </div>
    </form>
  );
};

const useFormComponentStyle = (numberOfChildren: number) => {
  const theme = usePageBaseTheme();
  return css`
    label: form-component;

    border: 1px solid ${theme.grayscale.borderOnBackground};
    border-radius: ${theme.borderRadius};
    min-width: 400px;
    width: fit-content;

    padding: 16px;
    margin: auto;

    display: flex;
    flex-direction: column;
    min-height: ${numberOfChildren * 70}px;

    background-color: white;

    .wrapped-child {
      flex: 11 0 0;
    }

    .header-button {
      cursor: pointer;
      text-align: right;
      font-size: ${theme.fonts.outline.size};
      font-weight: ${theme.fonts.outline.weight};
    }

    .title {
      flex: 12 0 0;
      padding: ${theme.padding};
      font-size: ${theme.fonts.headline.size};
      font-weight: ${theme.fonts.headline.weight};
      min-height: 65px;
      margin: auto;
    }

    .controls {
      margin: 0 0 12px 0;
      display: flex;

      > * {
        flex: 12 0 0;
        float: right;
      }
    }
  `;
};
