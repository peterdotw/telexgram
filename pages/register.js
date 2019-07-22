import Layout from "../layout/Layout";

import Navigation from "../components/Navigation";
import RegisterForm from "../components/RegisterForm";
import Counter from "../components/Counter";

const Register = () => {
  return (
    <>
      <Layout />
      <>
        <Navigation />
        <RegisterForm />
        <Counter />
      </>
    </>
  );
};

export default Register;
