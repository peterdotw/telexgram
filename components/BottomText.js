import Link from "next/link";
import styled from "styled-components";

const StyledParagraph = styled.p`
  text-align: center;
  margin-top: 3em;
  font-size: 10px;
  font-weight: 300;
`;

const StyledLink = styled.a`
  :hover {
    color: #39ede1;
    cursor: pointer;
  }
`;

const BottomText = () => (
  <StyledParagraph>
    Don't have an account?{" "}
    <Link href="/register">
      <StyledLink>Register</StyledLink>
    </Link>{" "}
    now!
  </StyledParagraph>
);

export default BottomText;
