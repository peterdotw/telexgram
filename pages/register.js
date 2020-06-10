import Layout from "../layout/Layout";
import Navigation from "../components/Navigation";
import RegisterForm from "../components/RegisterForm";
import { AlertTemplate, options, AlertProvider } from "../config/alert";

const Register = () => {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <>
        <Layout />
        <>
          <Navigation />
          <RegisterForm />
        </>
      </>
    </AlertProvider>
  );
};

export default Register;
