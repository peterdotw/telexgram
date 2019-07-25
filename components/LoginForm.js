import { useState } from "react";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import axios from "axios";

import Wrapper from "./Wrapper";
import Header from "./Header";
import Text from "./Text";
import BottomText from "./BottomText";
import { StyledForm, StyledInput, StyledButton } from "./FormComponents";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`/api/login`, { login, password })
      .then(res => {
        alert.show("You're now logged in!", { type: "success" });
        console.log("Działa!");

        const token = res.data;
        sessionStorage.setItem("auth-token", token);

        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);
          alert.show("Login or password is wrong");
        }
      });
  };

  const handleLoginChange = event => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = event => {
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
