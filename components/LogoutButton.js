import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import axios from "axios";

import { StyledButton } from "../components/FormComponents";

const LogoutButton = () => {
  const alert = useAlert();
  const router = useRouter();

  const handleClick = e => {
    e.preventDefault();
    axios
      .get(`/api/logout`)
      .then(res => {
        console.log("Logged out");
        alert.show("Logged out!", { type: "success" });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);
          alert.show("Can't log out!");
        }
      });
  };
  return <StyledButton onClick={handleClick}>log out</StyledButton>;
};

export default LogoutButton;
