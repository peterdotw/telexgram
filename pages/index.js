import Layout from "../layout/Layout";

import Navigation from "../components/Navigation";
import Container from "../components/Container";
import Counter from "../components/Counter";

const Home = () => {
  return (
    <>
      <Layout />
      <>
        <Navigation />
        <Container />
        <Counter />
      </>
    </>
  );
};

export default Home;
