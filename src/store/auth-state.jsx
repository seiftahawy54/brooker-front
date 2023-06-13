import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: async () => {},
  userData: {},
});

const AuthContextProvider = (props) => {
  const [loginState, setLoginState] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (typeof localStorage.getItem("userToken") === "string") {
      setLoginState(true);
      setUserData({
        token: localStorage.getItem("userToken"),
        data: JSON.parse(localStorage.getItem("userData")),
      });
    } else {
      setLoginState(false);
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage.getItem("userToken") === 'string') {
      axios.defaults.headers.common[
          "Authorization"
          ] = `Bearer ${localStorage.getItem("userToken")}`;
    }

    if (loginState) {
      axios.defaults.headers.common[
          "Authorization"
          ] = `Bearer ${userData.token}`;
    }
  }, [loginState])

  const logoutHandler = () => {
    setLoginState(false);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
  };

  const loginHandler = () => {
    return new Promise((resolve, reject) => {
      setLoginState(true);
      setUserData({
        token: localStorage.getItem("userToken"),
        data: JSON.parse(localStorage.getItem("userData")),
      });

      setTimeout(() => {
        resolve();
      }, 300)
    })
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
