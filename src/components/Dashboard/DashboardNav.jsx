import { useNavigate } from "react-router";

const DashboardNav = () => {
    const navigate = useNavigate()
    return (
        <>
            <h2 className="h1 text-white text-center">What you want to do</h2>
            <section className="wrapper d-flex">
                <button className={"btn btn-primary"} onClick={() => navigate('/dashboard/posts/reviewPosts')}>
                    Approve / Refuse Posts
                </button>
                <button className={"btn btn-primary"} onClick={() => navigate('/dashboard/posts')}>
                    All Posts
                </button>
                <button className={"btn btn-primary"} onClick={() => navigate('/dashboard/users')}>
                    Users
                </button>
            </section>
        </>
    );
};

export default DashboardNav
