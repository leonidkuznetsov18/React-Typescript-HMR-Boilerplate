import { createGlobalStyle } from 'styled-components/macro';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }
  #root {
    height: 100%;
  }
  code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;
