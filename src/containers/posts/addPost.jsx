import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/pages/addpost.css";
import { useSearchParams } from "react-router-dom";
import authState from "../../store/auth-state.jsx";

const addPost = () => {

    const authContext = useContext(authState);
    const [submitStatus, setSubmitStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [oneImg, setOneImg] = useState(null);
    const [multipleImg, setMultipleImg] = useState(null);
    const [editParams] = useSearchParams();
    const [isEditMode, setEditMode] = useState(false);
    const [editPostId, setEditPostId] = useState("");
    const [editPostData, setEditPostData] = useState({});

    const titleRef = useRef();
    const priceRef = useRef();
    const flatTypesRef = useRef();
    const spaceRef = useRef();
    const numberOfRoomsRef = useRef();

    const fetchSinglePostData = (postId = "") => axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`)
        .then(({ data }) => {
            titleRef.current.value = data.post.title;
            priceRef.current.value = data.post.price;
            flatTypesRef.current.value = data.post.flatSpecs.flatType;
            spaceRef.current.value = data.post.flatSpecs.space;
            numberOfRoomsRef.current.value = data.post.flatSpecs.numberOfRooms;
        })
        .catch(err => {
            console.log(err);
            toast.error(err.message);
        });

    useEffect(() => {
        if (authContext.isLoggedIn) {
            if (editParams.get("editMode") === "true") {
                setEditMode(true);
                setEditPostId(editParams.get("postId"));
                fetchSinglePostData(editParams.get("postId"));
            }
        }
    }, [authContext.isLoggedIn]);

    const submitPostHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (isEditMode && oneImg) {
            formData.append("mainImg", oneImg);
        }

        if (isEditMode && multipleImg && multipleImg?.length > 0) {
            for (let i = 0; i < multipleImg.length; i++) {
                formData.append("images", multipleImg[i]);
            }
        }

        if (!isEditMode) {
            formData.append("mainImg", oneImg);
            for (let i = 0; i < multipleImg.length; i++) {
                formData.append("images", multipleImg[i]);
            }
        }
        formData.append("title", titleRef.current.value);
        formData.append("price", priceRef.current.value);
        const flatSpecs = {
            space: spaceRef.current.value,
            numberOfRooms: numberOfRoomsRef.current.value,
            flatType: flatTypesRef.current.value
        };
        formData.append("flatSpecs[space]", flatSpecs.space.toString());
        formData.append("flatSpecs[numberOfRooms]", flatSpecs.numberOfRooms.toString());
        formData.append("flatSpecs[flatType]", flatSpecs.flatType.toString());

        try {
            let url = "";
            let requestCall = async () => {
            };
            if (isEditMode) {
                url = `${import.meta.env.VITE_BACKEND_URL}/posts/${editPostId}`;
                console.log(titleRef.current.value, priceRef.current.value, spaceRef.current.value);
                requestCall = async () => axios.put(url, formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });
            } else {
                url = `${import.meta.env.VITE_BACKEND_URL}/posts`;
                requestCall = async () => axios.post(url, formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });
            }

            const result = await requestCall();

            console.log(result);

            if (result?.statusText === "OK") {
                toast.success(`Post ${isEditMode ? "edited" : "added"} successfully`);
                if (!isEditMode)
                    toast.success("Please wait until post approval from admins");
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    const handleUploadOneImg = async (e) => {
        setOneImg(e.target.files[0]);
    };

    const handleUploadManyImgs = async (e) => {
        setMultipleImg(e.target.files);
    };

    return (
        <div className={"add-post-container"}>
            <section className={"addpost"}>
                {
                    errorMessage.length > 0 &&
                    (
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    )
                }
                {
                    isEditMode ? <h2 className={"h1"}>Edit the post</h2> : <h2 className={"h1"}>Add new post</h2>
                }
                <form>
                    <div>
                        ADD YOUR TITLE:  &nbsp; <input type="text" placeholder="Title" ref={titleRef} />
                    </div>
                    <br />
                    <div>
                        ADD YOUR PRICE:  &nbsp; <input type="number" placeholder="Price" min={100} ref={priceRef} />
                    </div>
                    <br />
                    <div>
                        Main Picture : &nbsp;
                        <input type="file" onChange={handleUploadOneImg} />
                    </div>
                    <br />
                    <div>
                        Detailed Pictures: <input type="file" multiple={true} onChange={handleUploadManyImgs} />
                    </div>
                    <br />
                    <div>
                        Type : &nbsp;
                        <select name="" id="" ref={flatTypesRef}>
                            <option value="single">
                                Single
                            </option>
                            <option value="double">
                                Double
                            </option>
                            <option value="villa">
                                Villa
                            </option>
                        </select>
                    </div>
                    <br />
                    <div>
                        Space :  &nbsp;
                        <input type="number" placeholder={"Please enter the size"} ref={spaceRef} />
                    </div>
                    <br />
                    <div>
                        Number of rooms : &nbsp;
                        <input type="number" placeholder={"Number of rooms"} ref={numberOfRoomsRef} />
                    </div>
                    <br />
                    <button className={"btn btn-primary"} disabled={submitStatus} onClick={submitPostHandler}>
                        Submit
                    </button>
                </form>
                {/*<ToastContainer />*/}
            </section>
        </div>
    );
};

export default addPost;
