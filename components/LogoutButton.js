import { useAlert } from "react-alert";
import Router from "next/router";
import styled from "styled-components";
import axios from "axios";

import { StyledButton } from "../components/FormComponents";

const BetterButton = styled(StyledButton)`
  width: 40%;
  margin-bottom: 2em;

  @media only screen and (max-width: 768px) {
    margin: 0;
  }
`;

const LogoutButton = props => {
  const alert = useAlert();

  const handleClick = e => {
    e.preventDefault();
    axios.get(`/api/logout`).then(res => {
      console.log("Logged out");
      alert.show("Logged out", { type: "success" });
      setTimeout(() => {
        Router.push("/");
      }, 1000);
    });
  };
  return <BetterButton onClick={handleClick}>log out</BetterButton>;
};

export default LogoutButton;
