import { useState, useEffect } from "react";
import { socket } from "../config/socket";
import Layout from "../layout/Layout";
import Navigation from "../components/Navigation";
import LogoutButton from "../components/LogoutButton";
import Counter from "../components/Counter";
import Wrapper from "../components/Wrapper";
import ChatWindow from "../components/ChatWindow";

import { AlertTemplate, options, AlertProvider } from "../config/alert";

const Dashboard = ({ user }) => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    socket.emit("userCount", {});
    socket.on("userCount", data => {
      setCount(data.userCount);
    });

    setName(user);
  }, []);

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <>
        <Layout />
        <>
          <Navigation />
          <Wrapper>
            <ChatWindow name={name} />
            <p>Hello, {name}</p>
            <LogoutButton />
          </Wrapper>
          <Counter count={count} />
        </>
      </>
    </AlertProvider>
  );
};

export default Dashboard;
