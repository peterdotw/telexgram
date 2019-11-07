import { useAlert } from "react-alert";
import Router from "next/router";
import styled from "styled-components";
import { handleLogout } from "../config/databaseApi";

import { StyledButton } from "./styled_components/FormComponents";

const BetterButton = styled(StyledButton)`
  width: 40%;
  margin-bottom: 2em;

  @media only screen and (max-width: 768px) {
    margin: 0;
  }
`;

const LogoutButton = () => {
  const alert = useAlert();

  const handleClick = async event => {
    try {
      event.preventDefault();
      await handleLogout();
      alert.show("Logged out", { type: "success" });
      setTimeout(() => {
        Router.push("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return <BetterButton onClick={handleClick}>log out</BetterButton>;
};

export default LogoutButton;
