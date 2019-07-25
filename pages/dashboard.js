import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Layout from "../layout/Layout";

import Navigation from "../components/Navigation";
import LogoutButton from "../components/LogoutButton";
import Counter from "../components/Counter";

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

    axios
      .get(`/api/login`)
      .then(res => {
        console.log(res);
        setUser(res.data.login);
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);
        }
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
          <h1>Hello, {user}</h1>
          <LogoutButton />
          <Counter count={count} />
        </>
      </>
    </AlertProvider>
  );
};

export default Dashboard;
