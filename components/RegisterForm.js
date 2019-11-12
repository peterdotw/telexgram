import { useState } from "react";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import { handleRegister } from "../config/databaseApi";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import { StyledForm, StyledInput, StyledButton } from "./styled_components/FormComponents";

const RegisterForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const alert = useAlert();
  const router = useRouter();

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      await handleRegister(login, password, confirmPassword);
      alert.show("You're now registered", { type: "success" });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert.show(error.response.data);
      }
    }
  };

  const handleLoginChange = event => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = event => {
    setConfirmPassword(event.target.value);
  };

  return (
    <Wrapper>
      <Header text="Register" />
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <StyledInput
            type="text"
            id="login"
            name="login"
            placeholder="create login"
            value={login}
            onChange={handleLoginChange}
          />
        </div>

        <div>
          <StyledInput
            type="password"
            id="password"
            name="password"
            placeholder="create password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div>
          <StyledInput
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <StyledButton type="submit">register</StyledButton>
      </StyledForm>
    </Wrapper>
  );
};

export default RegisterForm;