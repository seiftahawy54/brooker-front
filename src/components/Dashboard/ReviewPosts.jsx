import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-state.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router";

const DashboardPosts = () => {

    const authContent = useContext(AuthContext);
    const [postsToReview, setPostsToReview] = useState([]);
    const location = useLocation();
    const fetchPostsToReviewAPI = () =>
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard/posts/toReview`)
            .then(({ data }) => {
                setPostsToReview(data.posts);
            })
            .catch(err => {
                toast.error(err.message);
            });

    const fetchAllPostsForDeletion = () => axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard/posts/`)
        .then(({ data }) => {
            setPostsToReview(data.posts);
        })
        .catch(err => {
            toast.error(err.message);
        });

    useEffect(() => {
        if (authContent.isLoggedIn && authContent.userData.data.role === "admin") {
            if (location.pathname === "/dashboard/posts/reviewPosts") {
                fetchPostsToReviewAPI();
            } else {
                fetchAllPostsForDeletion();
            }
        }
    }, [authContent.isLoggedIn, postsToReview]);

    const handlePostChangeStatus = (postId, actionType) => {
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/dashboard/posts/updateStatus/${postId}`, {
            newStatus: actionType
        })
            .then(({ data }) => {
                toast.success(`Post ${actionType} successfully`);
            })
            .catch(err => {
                toast.error(err.message);
            });

        fetchPostsToReviewAPI();
    };

    const handleDeletePost = (postId) => {
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/dashboard/posts/${postId}`)
            .then(({ data }) => {
                toast.success("Post deleted successfully");
            })
            .catch(err => {
                toast.error(err.message);
            });
    };

    return (
        <div className={"text-white"}>
            {
                location.pathname === "/dashboard/posts/reviewPosts" ?
                    <h2 className="h1 text-center">Approve / Refuse Posts</h2>
                :
                    <h2 className="h1 text-center">All posts</h2>
            }
            {
                postsToReview.length === 0 ?
                    <div className={"alert alert-primary text-center"}>No posts to review</div>
                    :
                    <div className={"table-responsive"}>
                        <table className="table table-dark table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Seller Username</th>
                                <th scope="col">Title</th>
                                <th scope="col">Price</th>
                                <th scope="col">Main Img</th>
                                <th scope="col">Specs</th>
                                <th scope="col">Status</th>
                                {
                                    location.pathname === "/dashboard/posts/reviewPosts" ?
                                        <th scope="col">Approve / Refuse</th>
                                        :
                                        <th scope="col">Delete</th>
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {postsToReview.map((post, indx) => (
                                <tr>
                                    <th scope="row">{indx + 1}</th>
                                    <td>{post.seller.username}</td>
                                    <td>{post.title}</td>
                                    <td>{post.price}</td>
                                    <td className={"w-50"}><img className={"w-75 h-25"}
                                                                src={`${import.meta.env.VITE_BACKEND_STATIC}/${post.mainImg}`} />
                                    </td>
                                    <td>
                                        <ul>
                                            <li>
                                                Size: {post.flatSpecs.space}
                                            </li>
                                            <li>
                                                Number of rooms: {post.flatSpecs.numberOfRooms}
                                            </li>
                                            <li>
                                                Type : {post.flatSpecs.flatType}
                                            </li>
                                        </ul>
                                    </td>
                                    <td>
                                        {post.status}
                                    </td>
                                    <td>
                                        {
                                            location.pathname === "/dashboard/posts/reviewPosts"
                                            ?
                                                <>
                                                    <button className="btn btn-primary d-block"
                                                            onClick={() => handlePostChangeStatus(post._id, "accepted")}>
                                                        Accept
                                                    </button>
                                                    <br />
                                                    <button className="btn btn-danger d-block"
                                                            onClick={() => handlePostChangeStatus(post._id, "refused")}>
                                                        Refuse
                                                    </button>
                                                </>
                                                :
                                                <>
                                                    <button className="btn btn-danger d-block"
                                                            onClick={() => handleDeletePost(post._id)}>
                                                        Delete Post
                                                    </button>
                                                </>
                                        }

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
            }
            <ToastContainer />
        </div>
    );
};

export default DashboardPosts;
