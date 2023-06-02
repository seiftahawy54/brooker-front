import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-state.jsx";
import { useNavigate } from "react-router";

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [authState, setAuthState] = useState(
        <li>
            <NavLink to="/register">Login</NavLink>
        </li>
    );

    useEffect(() => {
        if (authContext.isLoggedIn) {
            setAuthState(
                <>
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
                        <NavLink to="/addPost" >
                            <span className={'fa fa-plus-circle'}></span> &nbsp;
                            Add Post
                        </NavLink>
                    </li>
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
                        <input name="q" placeholder="Search..." type="search" />
                    </form>
                    <li className="dropdown">
                        <NavLink to="/contact">Contact us</NavLink>
                    </li>
                    {authState}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
