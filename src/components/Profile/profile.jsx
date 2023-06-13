import "../../styles/pages/profile.css";
import UserImg from "../../assets/images/dp.jpg";
import { useContext, useEffect, useState } from "react";
import authState from "../../store/auth-state.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UserHome from "../UserHome/userHome.jsx";
import Chat from "../Chat/Chat.jsx";

const Profile = () => {
    const authContext = useContext(authState);
    const [userData, setUserData] = useState({});
    const [userChats, setUserChats] = useState([]);
    const [currentTab, setCurrentTab] = useState("posts");
    const [selectedChat, setSelectedChat] = useState('')

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
                })
                .catch(err => {
                    toast.error(err.message);
                });
        }
    }, [authContext.isLoggedIn]);

    const handleCurrentTab = (newTab) => setCurrentTab(newTab);

    const renderPostsTab =
        <UserHome isFromProfile={true} />;

    const generateCurrentUserChat = () => {
        const chatSet = new Set();
        for (let chat of userChats) {
            chatSet.add(chat.firstUser.username);
        }

        const uniqueChatIndexes = [];
        const uniqueUsersArr = [...chatSet];

        for (let uniqueUsername of uniqueUsersArr) {
            const userChatIndex = userChats.findIndex(chat => chat.firstUser.username === uniqueUsername);
            uniqueChatIndexes.push(userChats[userChatIndex]);
        }

        return uniqueChatIndexes;
    };

    // const onLoadChatHandler = (userId) => {
    //     setSelectedChat(userId)
    // }

    const renderUsersChats = <div className={'d-flex'}>
        <aside className={"chat"}>
            <header>
                <input type="text" placeholder="search" />
            </header>
            <ul>
                {
                    generateCurrentUserChat().map(chat => <>
                        <li key={chat._id} onClick={() => setSelectedChat(chat.firstUser._id)}>
                            <img
                                src={chat.firstUser.avatar ? `${import.meta.env.VITE_BACKEND_STATIC}/${chat.firstUser.avatar}` : UserImg}
                                alt={chat.firstUser.username} />
                            <div>
                                <h2>{chat.firstUser.username}</h2>
                            </div>
                        </li>
                    </>)
                }
            </ul>
        </aside>
        {selectedChat && <Chat otherUserId={selectedChat} />}
    </div>;


    return (
        <section className={"profile-section"}>
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="profile-header">
                            <div className="profile-header-cover"></div>

                            <div className="profile-header-content">
                                <div className="profile-header-img">
                                    <img src={userData?.avatar && UserImg} alt={userData?.username} />
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
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div id="content" className="content content-full-width">

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
