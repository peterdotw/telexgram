import styled from "styled-components";

const StyledHeader = styled.h1`
  font-size: 28px;
  margin: 0;
`;

const Header = props => {
  return <StyledHeader>{props.text}</StyledHeader>;
};

export default Header;
