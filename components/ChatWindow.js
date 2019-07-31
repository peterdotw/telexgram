import { useState, useEffect } from "react";
import io from "socket.io-client";

import { StyledForm, StyledInput, StyledButton } from "./FormComponents";
import { StyledDiv, StyledMessages } from "./ChatComponents";

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
