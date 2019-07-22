import { useState, useEffect } from "react";
import io from "socket.io-client";
import styled from "styled-components";

var socket;

const StyledCounter = styled.p`
  font-size: 2em;
  text-align: center;
  margin-top: 2em;
  animation: appear both 1s 1s ease-in;
  opacity: 0;

  @media only screen and (max-width: 768px) {
    margin-top: 0.8em;
    margin-bottom: 0.8em;
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket = io({ transports: ["websocket"] });
    console.log("connected");
    socket.on("userCount", function(data) {
      setCount(data.userCount);
    });

    return function cleanup() {
      socket.close();
    };
  }, []);

  return <StyledCounter>Online: {count}</StyledCounter>;
};

export default Counter;
