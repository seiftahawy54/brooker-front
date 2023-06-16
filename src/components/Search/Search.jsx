import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import UserHome from "../UserHome/userHome.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Search = () => {
    const [searchParams] = useSearchParams();
    const [searchResult, setSearchResult] = useState([]);
    const searchInputRef = useRef();

    const searchForPosts = (keyword = "") =>
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/search?kw=${keyword}`)
            .then(({ data }) => {
                setSearchResult(data.searchResult);
            })
            .catch(err => {
                toast.error(err.message);
            });

    useEffect(() => {
    }, [searchResult]);

    const onSearchForPostHandler = () => {
        searchForPosts(searchInputRef.current.value);
    };


    return (
        <section className={"container"}>
            <div className={"text-white fs-1"}>
                Search
                <input className={"form-control fs-2"} placeholder={"Write any post title to search"}
                       ref={searchInputRef} />
                <button className={"btn"} onClick={onSearchForPostHandler}>Search</button>
            </div>
            <section className={"text-white"}>
                Search Results

                {
                    searchResult.length === 0 ?
                        <div className={"alert alert-primary"}>No posts with this keywords</div> :
                        <UserHome isFromSearch={true} searchPosts={searchResult} />
                }
            </section>
            <ToastContainer />
        </section>
    );
};

export default Search;
