import styled from "styled-components";

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

  :hover {
    color: #39ede1;
  }
`;

export { StyledForm, StyledInput, StyledButton };
