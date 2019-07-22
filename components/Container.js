import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Text from "../components/Text";
import LoginForm from "../components/LoginForm";
import BottomText from "./BottomText";

const Container = () => {
  return (
    <Wrapper>
      <Header text="Welcome to Telexgram" />
      <Text />
      <LoginForm />
      <BottomText />
    </Wrapper>
  );
};

export default Container;
