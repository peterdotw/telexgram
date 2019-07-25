import { useState, useEffect } from "react";
import io from "socket.io-client";
import Layout from "../layout/Layout";
import jwtDecode from "jwt-decode";

import Navigation from "../components/Navigation";
import LogoutButton from "../components/LogoutButton";
import Counter from "../components/Counter";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";

import { AlertTemplate, options, AlertProvider } from "../config/alert";

var socket;

const Dashboard = () => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState("");

  useEffect(() => {
    socket = io({ transports: ["websocket"] });
    console.log("connected");
    socket.emit("addCount");
    socket.on("userCount", data => {
      setCount(data.userCount);
    });

    const decoded = jwtDecode(sessionStorage.getItem("auth-token"));

    setUser(decoded.login);

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
            <Header text={`Hello, ${user}`} />
            <LogoutButton />
            <Counter count={count} />
          </Wrapper>
        </>
      </>
    </AlertProvider>
  );
};

export default Dashboard;
