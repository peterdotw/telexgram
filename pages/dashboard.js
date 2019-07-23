import { useState, useEffect } from "react";
import io from "socket.io-client";
import Layout from "../layout/Layout";

import Navigation from "../components/Navigation";
import LogoutButton from "../components/LogoutButton";
import Counter from "../components/Counter";

import { AlertTemplate, options, AlertProvider } from "../config/alert";

var socket;

const Dashboard = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket = io({ transports: ["websocket"] });
    console.log("connected");
    socket.emit("addCount");
    socket.on("userCount", function(data) {
      setCount(data.userCount);
    });

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
          <h1>VoHiYo</h1>
          <LogoutButton />
          <Counter count={count} />
        </>
      </>
    </AlertProvider>
  );
};

export default Dashboard;
