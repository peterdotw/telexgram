import styled from "styled-components";

import { colors } from "../utils/index";

const StyledDiv = styled.div`
  width: 320px;
  height: 500px;

  form {
    height: 200px;
  }

  button {
    margin: 2em;
  }

  @media only screen and (max-width: 768px) {
    width: 250px;
    margin: 0;
    height: 450px;

    input {
      width: 80%;
    }
  }
`;

const StyledMessages = styled.div`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
  overflow: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 200px;

  @media only screen and (max-width: 768px) {
    height: 150px;
  }

  p {
    padding: 5px 10px;
  }

  p:nth-child(odd) {
    background: ${colors.primary};
    color: ${colors.secondary};
  }

  ::-webkit-scrollbar-y {
    width: 10px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.primary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.blue};
  }
`;

export { StyledDiv, StyledMessages };
