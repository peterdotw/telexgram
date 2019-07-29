import { useState, useEffect } from "react";
import io from "socket.io-client";
import Layout from "../layout/Layout";
import Navigation from "../components/Navigation";
import LogoutButton from "../components/LogoutButton";
import Counter from "../components/Counter";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import ChatWindow from "../components/ChatWindow";

import { AlertTemplate, options, AlertProvider } from "../config/alert";

var socket;

const Dashboard = ({ user }) => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    socket = io({ transports: ["websocket"] });
    console.log("connected");
    socket.emit("addCount");
    socket.on("userCount", data => {
      setCount(data.userCount);
    });

    setName(user);

    return function cleanup() {
      socket.close();
    };
  }, []);

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <>
        <Layout />
        <>
          <Navigation />
          <Wrapper>
            <ChatWindow name={name} />
            <LogoutButton />
          </Wrapper>
          <Counter count={count} />
        </>
      </>
    </AlertProvider>
  );
};

export default Dashboard;
