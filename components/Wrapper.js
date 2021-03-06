import styled from "styled-components";

import { colors } from "../utils/index";

const Wrapper = styled.div`
  width: 460px;
  height: 700px;
  padding: 20px 40px;
  border: 2px solid ${colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  animation: appear 1s ease-in;

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media only screen and (max-width: 768px) {
    width: 280px;
    height: 600px;
  }
`;

export default Wrapper;
