import styled from "styled-components";

const StyledHeader = styled.h1`
  font-size: 2em;
  text-align: center;
  margin-top: 2em;
`;

const Header = () => {
  return (
    <StyledHeader>
      Welcome to Telexgram, best chat app in the universe.
    </StyledHeader>
  );
};

export default Header;
