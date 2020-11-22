import React from "react";

function App() {
  const useButtonComponentStyle = () => {
    const hoverStyle = useButtonHoverStyle(false);
    return css`
      label: button;
      cursor: pointer;

      color: ${theme.grayscale.labelOnColor};
      background-color: ${theme.colors.normal};
      text-align: center;
      text-transform: uppercase;

      ${hoverStyle}

      padding: 8px;
    `;
  };

  return (
    <div className="App">
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
