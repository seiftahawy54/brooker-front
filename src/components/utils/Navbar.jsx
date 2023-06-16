import { NavLink } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../store/auth-state.jsx";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [authState, setAuthState] = useState(
        <li>
            <NavLink to="/register">Login</NavLink>
        </li>
    );
    const searchInputRef = useRef()
    const searchHandler = () => {
        navigate(`/search?kw=${searchInputRef.current.value}`)
    }

    useEffect(() => {
        if (authContext.isLoggedIn) {
            setAuthState(
                <>
                    <li>
                        <NavLink to="/homepage">
                            <span className="fa fa-home"></span> &nbsp;
                            Homepage
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">
                            <span className="fa fa-user-alt"></span> &nbsp;
                            {authContext?.userData?.data?.username}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favourite">
                            <span className="fa fa-heart"></span> &nbsp;
                            Favorite
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/addPost">
                            <span className={"fa fa-plus-circle"}></span> &nbsp;
                            Add Post
                        </NavLink>
                    </li>
                    {
                        authContext?.userData?.data?.role === 'admin' &&
                        <li>
                            <NavLink to="/dashboard">
                                <span className={"fa fa-toolbox"}></span> &nbsp;
                                Dashboard
                            </NavLink>
                        </li>
                    }
                    <li>
                        <a
                            onClick={() => {
                                authContext.onLogout();
                                navigate("/");
                            }}
                        >
                            Logout
                        </a>
                    </li>
                </>
            );
        } else {
            setAuthState(
                <li>
                    <NavLink to="/register">Login</NavLink>
                </li>
            );
        }
    }, [authContext.isLoggedIn]);

    return (
        <div id="header">
            <div className="logo">
                <NavLink to="/homepage" className="uil-home-alt">
                    Brooker
                </NavLink>
            </div>
            <nav>
                <ul>
                    <form className="search" action="search">
                        <input name="q" placeholder="Search..." type="search" ref={searchInputRef} onChange={searchHandler}/>
                    </form>
                    {authState}
                    <li className="dropdown">
                        <NavLink to="/contact">Contact us</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
