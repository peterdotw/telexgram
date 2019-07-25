import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import styled from "styled-components";

import { StyledButton } from "../components/FormComponents";

const BetterButton = styled(StyledButton)`
  width: 40%;
`;

const LogoutButton = () => {
  const alert = useAlert();
  const router = useRouter();

  const handleClick = e => {
    e.preventDefault();
    sessionStorage.clear();
    console.log("Logged out");
    alert.show("Logged out!", { type: "success" });
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };
  return <BetterButton onClick={handleClick}>log out</BetterButton>;
};

export default LogoutButton;
