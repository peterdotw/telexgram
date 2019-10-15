import Layout from "../layout/Layout";

import Navigation from "../components/Navigation";
import LoginForm from "../components/LoginForm";

import { AlertTemplate, options, AlertProvider } from "../config/alert";

const Home = () => {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <>
        <Layout />
        <>
          <Navigation />
          <LoginForm />
        </>
      </>
    </AlertProvider>
  );
};

export default Home;
