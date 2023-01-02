import "../../styles/pages/userhome.css";
import FirstImg from "../../assets/images/dp.jpg";
import { useContext, useEffect, useState } from "react";
import authState from "../../store/auth-state.jsx";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faImage,
  faSms,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const UserHome = () => {
  const authContext = useContext(authState);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/posts`;
    const Authentication = `Bearer ${authContext.userData["token"]}`;
    axios
      .get(backendUrl, {
        headers: {
          Authorization: Authentication,
        },
      })
      .then((result) => {
        setPosts(result.data.posts);
      })
      .catch(console.error);
  }, [authContext.isLoggedIn]);

  const generatedPosts = posts.map((post) => (
    <div className={`post place2 `} key={post._id}>
      <div className="post-top">
        <div className="dp">
          <img src={FirstImg} alt="" />
        </div>
        <div className="post-info">
          <p className="name">{post?.seller?.username}</p>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
          <button className="btn btn-primary me-md-2  " type="button">
            Edit
          </button>
        </div>
      </div>

      <div className="post-content ">
        {post.title}
        <main>
          <img
            className="photo "
            src={`${import.meta.env.VITE_BACKEND_STATIC}/${post.mainImg}`}
            alt=" "
          />
        </main>
        <main>
          {post.images.map((img) => (
            <img
              className="photo "
              src={`${import.meta.env.VITE_BACKEND_STATIC}/${img}`}
              alt=" "
            />
          ))}
        </main>
      </div>

      <div className="post-bottom ">
        <div className="action ">
          <FontAwesomeIcon icon={faHeart} /> <span>favorite</span>
        </div>
        <div className="action ">
          {post?.seller?._id !== authContext?.userData?.data?.id && (
            <Link to={`/chat/${post?.seller?._id}`} className={"btn btn-info"}>
              <FontAwesomeIcon icon={faSms} /> Chat
            </Link>
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="place">
      <div className="post create">
        <div className="post-top">
          <div className="dp">
            <img src={FirstImg} alt="" />
          </div>
          <input
            type="text"
            placeholder={`What's on your mind, ${authContext.userData?.data?.username} ?`}
          />
        </div>

        <div className="post-bottom">
          <div className="action">
            <FontAwesomeIcon icon={faVideo} />
            <span> video</span>
          </div>
          <div className="action">
            <FontAwesomeIcon icon={faImage} />
            <span>Photo</span>
          </div>
          <button type="button" className={"btn mt-4"}>
            add post
          </button>
        </div>
      </div>
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
