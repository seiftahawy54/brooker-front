import "../../styles/pages/userhome.css";
import FirstImg from "../../assets/images/dp.jpg";
import { useContext, useEffect, useState } from "react";
import authState from "../../store/auth-state.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faSms
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

const UserHome = ({ searchPosts, isFromSearch, isFromProfile }) => {
    const authContext = useContext(authState);
    const [posts, setPosts] = useState([]);
    const [favPosts, setFavPosts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/posts`;
    const fetchNormalPosts = () => axios
        .get(backendUrl)
        .then((result) => {
            setPosts(result.data.posts);
        })
        .catch((err) => {
            toast.error(err.message);
            console.log(`this is server error ${err.message}`);
        });

    const fetchFavPosts = () => axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/favouritePosts/`)
        .then((result) => {
            setFavPosts(result.data.favouritePosts);
        })
        .catch((err) => {
            console.log(err);
            toast.error("Couldn't fetch favourite posts");
        });

    useEffect(() => {
        if (authContext.isLoggedIn) {
            if (isFromSearch) {
                setPosts(searchPosts);
            } else {
                fetchNormalPosts();
                fetchFavPosts();
            }
        }
    }, [authContext.isLoggedIn, favPosts]);

    if (searchPosts) {
        useEffect(() => {
            setPosts(searchPosts);
        }, [searchPosts]);
    }

    const togglePostToFavHandler = async (e) => {
        const postId = e.target.getAttribute("data-post-id");
        const postIndex = posts.findIndex(
            (post) => post._id === postId
        );
        if (
            authContext?.userData?.data?.username === posts[postIndex].seller.username
        ) {
            toast.error("You are the owner of this post!");
            return;
        }


        if (isPostFavourite(postId)) {
            axios
                .delete(`${import.meta.env.VITE_BACKEND_URL}/users/deleteFavourite/${postId}`)
                .then((result) => {
                    toast.success("post deleted from favourites successfully");
                })
                .catch((err) => {
                    toast.error("Couldn't delete post from favourite");
                    console.error(err);
                });

        } else {
            axios
                .put(`${import.meta.env.VITE_BACKEND_URL}/users/favouritePosts/${postId}`)
                .then((result) => {
                    toast.success("post added to favourites successfully");
                })
                .catch((err) => {
                    toast.error("Couldn't add post to favourite");
                    console.error(err);
                });
        }

        fetchFavPosts();
    };
    const isPostFavourite = (postId) => {
        return favPosts.findIndex(post => post._id === postId) > -1;
    };

    const getPostsToRender = (location.pathname === "/favourite" || isFromProfile) ? favPosts : posts;

    const generatedPosts = getPostsToRender.map((post) => (
        <div className={`post place2 `} key={post._id}>
            {isPostFavourite(post._id) && <i className="fa fa-bookmark"></i>}
            <div className="post-top">
                <div className="dp">
                    {/* -> User image */}
                    <img src={FirstImg} alt="" />
                </div>
                <div className="post-info">
                    <p className="fs-2">{post.seller.username}</p>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    {authContext?.userData?.data?.username === post.seller.username && (
                        <button className="btn btn-primary me-md-2  " type="button" onClick={() => navigate(`/addPost?editMode=true&postId=${post._id}`)}>
                            Edit
                        </button>
                    )}
                </div>
            </div>

            <div className="post-content ">
                {post.title} <br />${post.price}
                <main>
                    Specifications:
                    <ol>
                        <li>
                            Size: {post.flatSpecs.space}
                        </li>
                        <li>
                            Number of rooms: {post.flatSpecs.numberOfRooms}
                        </li>
                        <li>
                            Type : {post.flatSpecs.flatType}
                        </li>
                    </ol>
                </main>
                <main>
                    <Link to={`/post/${post?._id}`}>
                        <img
                            className="photo "
                            src={`${import.meta.env.VITE_BACKEND_STATIC}/${post.mainImg}`}
                            alt=" "
                        />
                    </Link>
                </main>
                <main className={'overflow-scroll'}>
                    {post.images.map((img, index) => (
                        <img
                            key={index}
                            className="photo "
                            src={`${import.meta.env.VITE_BACKEND_STATIC}/${img}`}
                            alt=" "
                        />
                    ))}
                </main>
            </div>

            <div className="post-bottom ">
                {authContext?.userData?.data?.username !== post.seller.username && (
                    <div className="action ">
                        <button
                            className={"btn"}
                            onClick={togglePostToFavHandler}
                            data-post-id={post._id}
                        >
                            {isPostFavourite(post._id) ? (
                                <>
                                    <FontAwesomeIcon icon={faHeart} /> &nbsp; Un Favourite
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faHeart} /> &nbsp; Favorite
                                </>
                            )}
                        </button>
                    </div>
                )}
                <div className="action ">
                    {authContext?.userData?.data?.username !== post.seller.username && (
                        <Link to={`/chat/${post.seller._id}`} className={"btn btn-info"}>
                            <FontAwesomeIcon icon={faSms} /> Chat
                        </Link>
                    )}
                </div>
            </div>
        </div>
    ));

    return (
        <div className="place">
            {
                location.pathname === "/homepage"
                &&
                <div className="post create">
                    <div className="post-top">
                        <div className="dp">
                            <img src={FirstImg} alt="" />
                        </div>
                        {authContext?.userData?.data?.username}
                        <button
                            type="button"
                            className={"btn mt-4"}
                            onClick={() => navigate("/addPost")}
                        >
                            add post
                        </button>
                    </div>
                </div>
            }

            {generatedPosts?.length === 0 ? (
                <div>
                    You Don't have any posts go and add one !{" "}
                    <Link to={"/addPost"}>Add Post</Link>{" "}
                </div>
            ) : (
                generatedPosts
            )}
        </div>
    );
};

export default UserHome;
