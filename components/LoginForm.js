import { useState } from "react";
import { useAlert } from "react-alert";
import Router from "next/router";
import { handleLogin } from "../config/databaseApi";

import Wrapper from "./Wrapper";
import Header from "./Header";
import Text from "./Text";
import BottomText from "./BottomText";
import {
  StyledForm,
  StyledInput,
  StyledButton,
} from "./styled_components/FormComponents";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await handleLogin(login, password);
      alert.show("You're now logged in", { type: "success" });

      setTimeout(() => {
        Router.push("/login/redirect");
      }, 1000);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert.show("Login or password is wrong");
      }
    }
  };

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Wrapper>
      <Header text="Welcome to Telexgram" />
      <Text />
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <StyledInput
            type="text"
            id="login"
            name="login"
            placeholder="login"
            value={login}
            onChange={handleLoginChange}
          />
        </div>

        <div>
          <StyledInput
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <StyledButton type="submit">log in</StyledButton>
      </StyledForm>
      <BottomText />
    </Wrapper>
  );
};

export default LoginForm;
