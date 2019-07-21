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

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = event => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  return (
    <StyledForm action="/login" method="POST">
      <div>
        <label htmlFor="login">Login:</label>
        <StyledInput
          type="text"
          id="login"
          name="login"
          placeholder=""
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
          placeholder=""
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <StyledButton type="submit">Login</StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
