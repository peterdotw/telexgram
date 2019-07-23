import Layout from "../layout/Layout";

import Navigation from "../components/Navigation";
import RegisterForm from "../components/RegisterForm";
import Counter from "../components/Counter";

import { AlertTemplate, options, AlertProvider } from "../config/alert";

const Register = () => {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <>
        <Layout />
        <>
          <Navigation />
          <RegisterForm />
          <Counter />
        </>
      </>
    </AlertProvider>
  );
};

export default Register;