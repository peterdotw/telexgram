import Layout from "../layout/Layout";

import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <>
      <Layout />
      <>
        <Header text="Register" />
        <RegisterForm />
      </>
    </>
  );
};

export default Register;
