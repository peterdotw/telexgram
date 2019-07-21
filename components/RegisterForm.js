import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  text-align: center;
  margin-top: 2em;

  label {
    display: block;
    font-size: 1.5em;

    :last-of-type {
      margin-top: 1em;
    }
  }
`;

const StyledInput = styled.input`
  margin-top: 1em;
  font-size: 1.5em;
`;

const StyledButton = styled.button`
  margin-top: 1em;
  font-size: 1.5em;
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
    <StyledForm action="/register" method="POST">
      <div>
        <label htmlFor="login">Login:</label>
        <StyledInput
          type="text"
          id="login"
          name="login"
          placeholder="Enter Login"
          value={login}
          onChange={handleLoginChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <StyledInput
          type="password"
          id="password"
          name="password"
          placeholder="Create Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <StyledInput
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <StyledButton type="submit">Register</StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
