import Link from "next/link";
import styled from "styled-components";

const StyledParagraph = styled.p`
  text-align: center;
  margin-top: 6em;
  font-size: 10px;
  font-weight: 300;

  @media only screen and (max-width: 768px) {
    margin-top: 4em;
  }
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
