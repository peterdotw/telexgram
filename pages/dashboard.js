import Layout from "../layout/Layout";

import Navigation from "../components/Navigation";
import LogoutButton from "../components/LogoutButton";
import Counter from "../components/Counter";

import { AlertTemplate, options, AlertProvider } from "../config/alert";

const Dashboard = () => {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <>
        <Layout />
        <>
          <Navigation />
          <h1>VoHiYo</h1>
          <LogoutButton />
          <Counter />
        </>
      </>
    </AlertProvider>
  );
};

export default Dashboard;
