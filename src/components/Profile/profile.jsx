import "../../styles/pages/profile.css";
import UserImg from "../../assets/images/dp.jpg";
import { useContext, useEffect, useState } from "react";
import authState from "../../store/auth-state.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UserHome from "../UserHome/userHome.jsx";

const Profile = () => {
    const authContext = useContext(authState);
    const [userData, setUserData] = useState({});
    const [userChats, setUserChats] = useState([]);
    const [currentTab, setCurrentTab] = useState("posts");

    const fetchUserData = () => axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/settings/profile`)
        .then(result => {
            setUserData(result.data.user);
        })
        .catch(err => {
            toast.error(err.message);
        });

    const fetchUserChats = () => axios.get(`${import.meta.env.VITE_BACKEND_URL}/chats/allChats`)
        .then(result => {
            setUserChats(result.data.chat);
        })
        .catch(err => {
            toast.error(err.message);
        });

    useEffect(() => {
        if (authContext.isLoggedIn) {
            fetchUserData();
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/chats/allChats`)
                .then(result => {
                    setUserChats(result.data.chat);
                    console.log(result.data);
                })
                .catch(err => {
                    toast.error(err.message);
                });
        }
    }, [authContext.isLoggedIn]);

    const handleCurrentTab = (newTab) => setCurrentTab(newTab);

    const renderPostsTab =
        <UserHome isFromProfile={true} />;

    const generateCurrentUserChat = () => userChats.map(chat => {
        return chat.firstUser.username;
    });
    
    console.log(new Set([...generateCurrentUserChat()]))
    const renderUsersChats = <> </>;
    
   /* const renderUsersChats =
        <>
            <ul>
                {
                    new Set([...generateCurrentUserChat()]).values()?.f(chat =>
                        (
                            <>
                                <li>
                                    {
                                        chat.secondUser.username
                                    }
                                </li>
                            </>
                        )
                    )
                }
            </ul>
        </>;*/


    return (
        <section className={"profile-section"}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div id="content" className="content content-full-width">
                            <div className="profile">
                                <div className="profile-header">
                                    <div className="profile-header-cover"></div>

                                    <div className="profile-header-content">
                                        <div className="profile-header-img">
                                            <img src={userData.avatar && UserImg} alt={userData.username} />
                                        </div>

                                        <div className="profile-header-info">
                                            <h4 className="m-t-10 m-b-5">
                                                {userData.fullname}
                                            </h4>
                                            <Link to={"/editProfile"} className="btn btn-sm btn-info mb-2">
                                                Edit Profile
                                            </Link>
                                        </div>
                                    </div>

                                    <ul className="profile-header-tab nav nav-tabs">
                                        <li className={`nav-link ${currentTab === "posts" && "text-red"}`}
                                            onClick={() => handleCurrentTab("posts")}>
                                            Posts
                                        </li>
                                        <li className={`nav-link ${currentTab === "chats" && "text-red"}`}
                                            onClick={() => handleCurrentTab("chats")}>
                                            Chats
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="profile-content">
                                <div className="tab-content p-0">
                                    <div className="tab-pane fade active show" id="profile-post">
                                        {
                                            currentTab === "posts" && renderPostsTab
                                        }
                                        {
                                            currentTab === "chats" && renderUsersChats
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
