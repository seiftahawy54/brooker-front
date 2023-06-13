import "../../styles/pages/register.css";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";
import AuthContext from "../../store/auth-state.jsx";

const register = () => {
    const [currentState, setCurrentState] = useState("login");
    const [errorMessage, setErrorMessage] = useState("");
    const authContext = useContext(AuthContext);
    const navigation = useNavigate();
    const changeStateElement = useRef(null);
    const regName = useRef();
    const regPassword = useRef();
    const regConfirmPassword = useRef();
    const regEmail = useRef();
    const birthDate = useRef();
    const regNumber = useRef();
    const nationalId = useRef();
    const regUsername = useRef();

    const loginUsername = useRef();
    const loginPassword = useRef();

    const selectAction = (e) => {
        const newState = currentState === "login" ? "register" : "login";
        setCurrentState(newState);
    };

    const submitRegisterHandler = async (e) => {
        axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
                fullname: regName.current.value,
                age: birthDate.current.value,
                nationalId: nationalId.current.value,
                username: regUsername.current.value,
                password: regPassword.current.value,
                confirmPassword: regConfirmPassword.current.value,
                email: regEmail.current.value
            })
            .then((result) => {
                if (result.status === 200) {
                    if (errorMessage.length > 0) setErrorMessage("");
                    changeStateElement.current.click();
                }
            })
            .catch((e) => {
                setErrorMessage(
                    `Field ${e.response.data.message[0].field} ${e.response.data.message[0].reason}`
                );
            });
    };

    const loginHandler = () => {
        axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                username: loginUsername.current.value,
                password: loginPassword.current.value
            })
            .then((result) => {
                if (result.status === 200) {
                    const decodedData = jwtDecode(result.data.token);
                    localStorage.setItem("userToken", result.data.token);
                    localStorage.setItem("userData", JSON.stringify(decodedData));
                    authContext.onLogin().then(() => {
                        navigation("/homepage");
                    });
                }
            })
            .catch((e) => {
                setErrorMessage(
                    `Field ${e.response.data.message.field} ${e.response.data.message.reason}`
                );
            });
    };

    return (
        <div className="section">
            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <h6 className="mb-0 pb-3">
                                <span>Log In </span>
                                <span>Sign Up</span>
                            </h6>
                            <input
                                onClick={selectAction}
                                ref={changeStateElement}
                                className="checkbox"
                                type="checkbox"
                                id="reg-log"
                                name="reg-log"
                                autoComplete="off"
                            />
                            <label htmlFor="reg-log"></label>
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Log In</h4>
                                                {errorMessage.length !== 0 ? (
                                                    <div className={"alert alert-danger"}>
                                                        {errorMessage}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        className="form-style"
                                                        placeholder="Your Username"
                                                        id="username"
                                                        autoComplete="off"
                                                        ref={loginUsername}
                                                    />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        ref={loginPassword}
                                                        type="password"
                                                        name="logpass"
                                                        className="form-style"
                                                        placeholder="Your Password"
                                                        id="logpass"
                                                        autoComplete="off"
                                                    />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <button className="btn mt-4" onClick={loginHandler}>
                                                    submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Sign Up</h4>
                                                {errorMessage.length !== 0 ? (
                                                    <div className={"alert alert-danger"}>
                                                        {errorMessage}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        name="logname"
                                                        ref={regName}
                                                        className="form-style"
                                                        placeholder="Your Full Name"
                                                        id="logname"
                                                        autoComplete="off"
                                                    />
                                                    <i className="input-icon uil uil-user"></i>
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        name="registerUsername"
                                                        ref={regUsername}
                                                        className="form-style mt-2"
                                                        placeholder="Enter username"
                                                        id="logname"
                                                        autoComplete="off"
                                                    />
                                                    <i className="input-icon uil uil-user"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="email"
                                                        ref={regEmail}
                                                        name="regEmail"
                                                        className="form-style"
                                                        placeholder="Your Email"
                                                        id="logemail"
                                                        autoComplete="off"
                                                    />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        ref={regPassword}
                                                        type="password"
                                                        name="logpass"
                                                        className="form-style"
                                                        placeholder="Your Password"
                                                        id="logpass"
                                                        autoComplete="off"
                                                    />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        ref={regConfirmPassword}
                                                        type="password"
                                                        name="logpass"
                                                        className="form-style"
                                                        placeholder="Confirm Your Password"
                                                        id="logpass"
                                                        autoComplete="off"
                                                    />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        ref={birthDate}
                                                        type="number"
                                                        name="logdate"
                                                        className="form-style"
                                                        placeholder="Your age"
                                                        id="logdate"
                                                        autoComplete="off"
                                                    />
                                                    <i className="input-icon uil uil-calendar-alt"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="text"
                                                        ref={regNumber}
                                                        name="lognum"
                                                        className="form-style"
                                                        placeholder="Your phone number"
                                                        id="lognum"
                                                        autoComplete="off"
                                                    />
                                                    <i className="input-icon uil uil-phone-alt"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="number"
                                                        ref={nationalId}
                                                        name="lognum"
                                                        className="form-style"
                                                        placeholder="Your national id "
                                                        id="lognum"
                                                        autoComplete="off"
                                                        min={"14"}
                                                        max={"14"}
                                                    />
                                                    <i className="input-icon uil  uil-user"></i>
                                                </div>
                                                <button
                                                    className="btn mt-4"
                                                    onClick={submitRegisterHandler}
                                                >
                                                    submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default register;
