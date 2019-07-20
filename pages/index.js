import { useState, useEffect } from "react";
import io from "socket.io-client";

import Layout from "../layout/Layout";

import Header from "../components/Header";
import Counter from "../components/Counter";

var socket;

const Home = () => {
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

  return (
    <>
      <Layout />
      <>
        <Header text="Welcome to Telexgram, best chat app in the universe." />
        <Counter count={count} />
      </>
    </>
  );
};

export default Home;
