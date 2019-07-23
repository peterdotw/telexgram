import { useState, useEffect } from "react";
import io from "socket.io-client";
import Layout from "../layout/Layout";

import Navigation from "../components/Navigation";
import LoginForm from "../components/LoginForm";
import Counter from "../components/Counter";

import { AlertTemplate, options, AlertProvider } from "../config/alert";

var socket;

const Home = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket = io({ transports: ["websocket"] });
    console.log("connected");
    socket.emit("fetchCount");
    socket.on("userCount", function(data) {
      setCount(data.userCount);
    });
  }, []);

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <>
        <Layout />
        <>
          <Navigation />
          <LoginForm />
          <Counter count={count} />
        </>
      </>
    </AlertProvider>
  );
};

export default Home;
