import { createGlobalStyle } from "styled-components";
import Head from "next/head";

import { colors, typography } from "../utils/index";

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body, button, input {
  font-family: ${typography.font};
}

body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.secondary};
  color: ${colors.primary};

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
  background-color: ${colors.secondary};
}
`;

const Layout = props => (
  <>
    <Head>
      <title>telexgram</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="https://socket.io/images/favicon.png" />
      <link
        href="https://fonts.googleapis.com/css?family=Fira+Code&display=swap"
        rel="stylesheet"
      />
    </Head>
    <GlobalStyle>{props.children}</GlobalStyle>
  </>
);

export default Layout;
