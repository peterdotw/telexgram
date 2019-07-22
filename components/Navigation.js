import Link from "next/link";
import styled from "styled-components";

const StyledSpan = styled.span`
  font-size: 21px;
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  top: 0;
  padding: 30px 50px;
`;

const StyledUl = styled.ul`
  display: flex;
  font-size: 16px;
  list-style: none;

  li {
    margin-left: 40px;
    cursor: pointer;

    :hover {
      color: #39ede1;
    }
  }
`;

const Navigation = () => {
  return (
    <StyledNav>
      <StyledSpan>telexgram</StyledSpan>
      <StyledUl>
        <Link href={"/about"}>
          <li>about</li>
        </Link>
        <Link href={"/merch"}>
          <li>merch</li>
        </Link>
        <Link href={"/contact"}>
          <li>contact</li>
        </Link>
      </StyledUl>
    </StyledNav>
  );
};

export default Navigation;
