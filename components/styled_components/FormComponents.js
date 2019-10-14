import styled from "styled-components";

import { colors } from "../../utils/index";

const StyledForm = styled.form`
  margin-top: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInput = styled.input`
  font-size: 20px;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  border: none;
  border-bottom: 1px solid ${colors.primary};
  width: 100%;
  margin: 15px 0;
`;

const StyledButton = styled.button`
  margin-top: 50px;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  border: none;
  border: 1px solid ${colors.primary};
  font-size: 14px;
  padding: 10px 19px;
  font-weight: 600;
  display: block;

  :hover {
    background-color: ${colors.primary};
    color: ${colors.secondary};
  }
`;

export { StyledForm, StyledInput, StyledButton };
