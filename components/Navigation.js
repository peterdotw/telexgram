import Link from "next/link";
import styled from "styled-components";

import { colors } from "../utils/index";

const StyledSpan = styled.span`
  font-size: 21px;
  cursor: pointer;
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  top: 0;
  padding: 30px 50px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    position: static;
    padding: 20px 40px;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  font-size: 16px;
  list-style: none;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }

  li {
    margin-left: 40px;
    cursor: pointer;

    :hover {
      color: ${colors.blue};
    }

    @media only screen and (max-width: 768px) {
      margin: 0;
      margin-top: 2em;
    }
  }
`;

const Navigation = () => {
  return (
    <StyledNav>
      <Link href={"/"}>
        <StyledSpan>telexgram</StyledSpan>
      </Link>
      <StyledUl>
        <Link href={"/about"}>
          <li>about</li>
        </Link>
      </StyledUl>
    </StyledNav>
  );
};

export default Navigation;
