import styled from "styled-components";

const StyledCounter = styled.p`
  font-size: 2em;
  text-align: center;
  margin-top: 2em;
  animation: appear both 1s 1s ease-in;
  opacity: 0;

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media only screen and (max-width: 768px) {
    margin-top: 0.8em;
    margin-bottom: 0.8em;
  }
`;

const Counter = props => {
  return <StyledCounter>Online: {props.count}</StyledCounter>;
};

export default Counter;
