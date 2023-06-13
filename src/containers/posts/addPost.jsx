import { useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import '../../styles/pages/addpost.css'

const addPost = () => {

    const [submitStatus, setSubmitStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [oneImg, setOneImg] = useState(null);
    const [multipleImg, setMultipleImg] = useState(null);

    const titleRef = useRef();
    const priceRef = useRef();
    const flatTypesRef = useRef();
    const spaceRef = useRef();
    const numberOfRoomsRef = useRef();

    const submitPostHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("mainImg", oneImg);
        for (let i = 0; i < multipleImg.length; i++) {
            formData.append("images", multipleImg[i]);
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
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

            console.log(result);

            if (result?.statusText === "OK") {
                toast.success("Post added successfully");
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
        <div className={'add-post-container'}>
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
