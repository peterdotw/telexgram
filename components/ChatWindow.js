import styled from "styled-components";
import { StyledForm, StyledInput, StyledButton } from "./FormComponents";
import { useState, useEffect } from "react";
import io from "socket.io-client";

import { colors } from "../utils/index";

const StyledDiv = styled.div`
  width: 320px;
  height: 500px;

  form {
    height: 200px;
  }

  button {
    margin: 2em;
  }

  @media only screen and (max-width: 768px) {
    width: 250px;
    margin: 0;
    height: 450px;

    input {
      width: 80%;
    }
  }
`;

const StyledMessages = styled.div`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
  overflow: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 200px;

  @media only screen and (max-width: 768px) {
    height: 150px;
  }

  p {
    padding: 5px 10px;
  }

  p:nth-child(odd) {
    background: ${colors.primary};
    color: ${colors.secondary};
  }

  ::-webkit-scrollbar-y {
    width: 10px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.primary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.blue};
  }
`;

var socket;

const ChatWindow = props => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io({ transports: ["websocket"] });

    socket.on("receive message", function(data) {
      addMessage(data);
    });

    return function cleanup() {
      socket.close();
    };
  }, []);

  const sendMessage = e => {
    e.preventDefault();

    socket.emit("send message", {
      message,
      author: props.name
    });

    setMessage("");
  };

  const addMessage = data => {
    setMessages(prevState => {
      return [...prevState, data];
    });
  };

  const handleMessage = e => {
    setMessage(e.target.value);
  };

  const allMessages = messages.map(message => {
    return (
      <p>
        {message.author}: {message.message}
      </p>
    );
  });

  return (
    <StyledDiv>
      <StyledMessages className="messages">{allMessages}</StyledMessages>
      <StyledForm action="">
        <StyledInput
          type="text"
          id="m"
          name="m"
          placeholder="message"
          autoComplete="off"
          value={message}
          onChange={handleMessage}
        />
        <StyledButton onClick={sendMessage}>send</StyledButton>
      </StyledForm>
    </StyledDiv>
  );
};

export default ChatWindow;
