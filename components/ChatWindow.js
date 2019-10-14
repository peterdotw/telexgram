import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

import { StyledForm, StyledInput, StyledButton } from "./styled_components/FormComponents";
import { StyledDiv, StyledMessages } from "./styled_components/ChatComponents";

let socket;

const ChatWindow = props => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io({ transports: ["websocket"] });

    socket.on("receive message", function(data) {
      addMessage(data);
    });

    axios.get("/api/chats").then(res => {
      res.data.map(mes => {
        setMessages(prevState => {
          return [
            ...prevState,
            { message: mes.message, author: mes.author, key: mes._id }
          ];
        });
      });
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
      <p key={message.key}>
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
