import Layout from "../layout/Layout";

import Navigation from "../components/Navigation";
import LoginForm from "../components/LoginForm";
import Counter from "../components/Counter";

import { AlertTemplate, options, AlertProvider } from "../config/alert";

const Home = () => {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <>
        <Layout />
        <>
          <Navigation />
          <LoginForm />
          <Counter />
        </>
      </>
    </AlertProvider>
  );
};

export default Home;
