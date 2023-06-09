import { useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

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
        <>
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
                    <input type="text" placeholder="Title" ref={titleRef} />
                </div>
                <div>
                    <input type="number" placeholder="Price" min={100} ref={priceRef} />
                </div>

                <div>
                    <div>Main Picture</div>
                    <input type="file" onChange={handleUploadOneImg} />
                </div>
                <div>
                    <input type="file" multiple={true} onChange={handleUploadManyImgs} />
                </div>

                <div>
                    Type
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


                <div>
                    <div>
                        Space
                    </div>
                    <input type="number" placeholder={"Please enter the size"} ref={spaceRef} />
                </div>

                <div>
                    <div>
                        Number of rooms
                    </div>
                    <input type="number" placeholder={"Number of rooms"} ref={numberOfRoomsRef} />
                </div>

                <button className={"btn btn-primary"} disabled={submitStatus} onClick={submitPostHandler}>
                    Submit
                </button>
            </form>
            {/*<ToastContainer />*/}
        </>
    );
};

export default addPost;
