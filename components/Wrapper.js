import styled from "styled-components";

const Wrapper = styled.div`
  width: 460px;
  height: 500px;
  padding: 20px 55px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  animation: appear 1s ease-in;

  @media only screen and (max-width: 768px) {
    width: 280px;
    height: 500px;
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default Wrapper;
