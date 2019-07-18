import styled from "styled-components";

const StyledCounter = styled.p`
  font-size: 2em;
  text-align: center;
  margin-top: 2em;
`;

const Counter = props => {
  return <StyledCounter>Online: {props.count}</StyledCounter>;
};

export default Counter;
