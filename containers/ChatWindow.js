import { useState, useEffect } from "react";
import { socket } from "../config/socket";
import { getChats } from "../config/databaseApi";

import {
  StyledForm,
  StyledInput,
  StyledButton,
} from "../components/styled_components/FormComponents";
import {
  StyledDiv,
  StyledMessages,
} from "../components/styled_components/ChatComponents";

const ChatWindow = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getChats();
        response.map((mes) => {
          setMessages((prevState) => {
            return [
              ...prevState,
              { message: mes.message, author: mes.author, key: mes._id },
            ];
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();

    socket.on("receive message", (data) => {
      addMessage(data);
    });

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit("send message", {
      message,
      author: props.name,
    });

    setMessage("");
  };

  const addMessage = (data) => {
    setMessages((prevState) => {
      return [...prevState, data];
    });
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const allMessages = messages.map((message) => {
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
