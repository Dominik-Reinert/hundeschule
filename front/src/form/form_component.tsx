import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";

interface FormComponentProps {
  title: string;
}

export const FormComponent = (
  props: React.PropsWithChildren<FormComponentProps>
) => {
  const formStyle = useFormComponentStyle(React.Children.count(props.children));
  return (
    <div css={formStyle}>
      <div className="title">{props.title}</div>
      {React.Children.map(props.children, (child) => (
        <div className="wrapped-child">{child}</div>
      ))}
    </div>
  );
};

const useFormComponentStyle = (numberOfChildren: number) => {
  const theme = usePageBaseTheme();
  return css`
    label: form-component;

    border: 1px solid ${theme.grayscale.borderOnBackground};
    min-width: 400px;
    width: fit-content;

    padding: 16px;
    margin: auto;


    display: flex;
    flex-direction: column;
    min-height: ${numberOfChildren * 70}px;
    
    .wrapped-child {
      flex: 11 0 0;
    }

    .title {
      flex: 12 0 0;
      padding: ${theme.padding};
      font-size: ${theme.fonts.headline.size};
      font-weight: ${theme.fonts.headline.weight};
    }
  `;
};
