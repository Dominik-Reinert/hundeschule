import { css } from "@emotion/core";
import React from "react";

function App() {
  const useButtonComponentStyle = () => {
    return css`
      label: button;
      cursor: pointer;

      text-align: center;
      text-transform: uppercase;

      padding: 8px;
    `;
  };

  const style = useButtonComponentStyle();

  return (
    <div className="App" css={style}>
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
