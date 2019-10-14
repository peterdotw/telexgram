import { useState, useEffect } from "react";
import io from "socket.io-client";
import Layout from "../layout/Layout";

import Navigation from "../components/Navigation";
import LoginForm from "../components/LoginForm";
import Counter from "../components/Counter";

import { AlertTemplate, options, AlertProvider } from "../config/alert";

let socket;

const Home = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket = io({ transports: ["websocket"] });
    console.log("connected");
    socket.on("userCount", data => {
      setCount(data.userCount);
      console.log(data.userCount);
    });
    socket.on("disconnect", () => {
      io.emit("disconnect");
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
          <LoginForm />
          <Counter count={count} />
        </>
      </>
    </AlertProvider>
  );
};

export default Home;
