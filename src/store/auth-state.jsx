import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
  userData: {},
});

const AuthContextProvider = (props) => {
  const [loginState, setLoginState] = useState();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (typeof localStorage.getItem("userToken") === "string") {
      setLoginState(true);
      setUserData({
        token: localStorage.getItem("userToken"),
        data: JSON.parse(localStorage.getItem("userData")),
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("userToken")}`;
    } else {
      setLoginState(false);
    }
  }, []);

  const logoutHandler = () => {
    setLoginState(false);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
  };

  const loginHandler = () => {
    setLoginState(true);
    setUserData({
      token: localStorage.getItem("userToken"),
      data: JSON.parse(localStorage.getItem("userData")),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: loginState,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        userData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
export default AuthContext;
