import styled from "styled-components";

const StyledHeader = styled.h1`
  font-size: 2em;
  text-align: center;
  margin-top: 2em;
`;

const Header = props => {
  return <StyledHeader>{props.text}</StyledHeader>;
};

export default Header;
