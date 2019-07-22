import { createGlobalStyle, ThemeProvider } from "styled-components";
import Head from "next/head";

import theme from "../utils/theme";

const GlobalStyle = createGlobalStyle`

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body, button, input {
  font-family: ${({ theme }) => theme.font.primary};
}

body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
}

#__next {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
`;

const Layout = props => (
  <ThemeProvider theme={theme}>
    <>
      <Head>
        <title>telexgram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="https://socket.io/images/favicon.png" />
      </Head>
      <GlobalStyle>{props.children}</GlobalStyle>
    </>
  </ThemeProvider>
);

export default Layout;
