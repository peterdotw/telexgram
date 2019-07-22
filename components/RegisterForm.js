import { useState } from "react";
import styled from "styled-components";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";

const StyledForm = styled.form`
  margin-top: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInput = styled.input`
  font-size: 20px;
  background-color: transparent;
  color: black;
  border: none;
  border-bottom: 1px solid black;
  width: 100%;
  margin: 15px 0;
`;

const StyledButton = styled.button`
  margin-top: 50px;
  background-color: black;
  color: white;
  border: none;
  font-size: 14px;
  padding: 10px 19px;
  font-weight: 600;
  display: block;
`;

const RegisterForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      <StyledForm action="/register" method="POST">
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
        <StyledButton type="submit">Register</StyledButton>
      </StyledForm>
    </Wrapper>
  );
};

export default RegisterForm;
