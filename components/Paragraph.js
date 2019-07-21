import Link from "next/link";
import styled from "styled-components";

const StyledParagraph = styled.p`
  text-align: center;
  margin-top: 1em;
`;

const StyledLink = styled.a`
  font-size: 1em;
  cursor: pointer;

  :hover {
    color: hotpink;
  }
`;

const Paragraph = () => (
  <StyledParagraph>
    Don't have an account?{" "}
    <Link href="/register">
      <StyledLink>Register</StyledLink>
    </Link>{" "}
    now!
  </StyledParagraph>
);

export default Paragraph;
