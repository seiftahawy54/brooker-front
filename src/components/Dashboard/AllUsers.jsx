import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-state.jsx";
import { useLocation } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AllUsers = () => {

    const authContent = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const fetchAllUsers = () =>
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard/users`)
            .then(({ data }) => {
                setUsers(data.users);
            })
            .catch(err => {
                toast.error(err.message);
            });


    useEffect(() => {
        if (authContent.isLoggedIn && authContent.userData.data.role === "admin") {
            fetchAllUsers();
        }
    }, [authContent.isLoggedIn, users]);

    const handleChangeUserRole = (userId, newRole) => {
        console.log(userId, newRole);
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/dashboard/users/upgradeUser/${userId}`, {
            "newStatus": newRole
        })
            .then(() => {
                toast.success(`User changed to ${newRole} successfully`);
            })
            .catch(err => {
                toast.error(`${err.response.data.message.field} is ${err.response.data.message.reason}`.toUpperCase());
            });
    };

    return (
        <>
            <div className={"text-white"}>
                <h2 className="h1 text-center">All Users</h2>
                {
                    users.length === 0 ?
                        <div className={"alert alert-primary text-center"}>No users in the system!!</div>
                        :
                        <div className={"table-responsive"}>
                            <table className="table table-dark table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Full-name</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">National Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">User image</th>
                                    <th scope="col">Promote / Downgrade user</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user, indx) => (
                                    <tr>
                                        <th scope="row">{indx + 1}</th>
                                        <td>{authContent.userData.data.username === user.username && <b>(You)</b>}{user.username}</td>
                                        <td>{user.fullname}</td>
                                        <td>{user.userType}</td>
                                        <td>
                                            {user.nationalId}
                                        </td>
                                        <td>
                                            {user.email}
                                        </td>
                                        <td>
                                            {user.age}
                                        </td>
                                        <td className={"w-25"}><img className={"w-75 h-25"}
                                                                    src={`${import.meta.env.VITE_BACKEND_STATIC}/${user.avatar}`} />
                                        </td>
                                        <td>
                                            <>
                                                <button className="btn btn-primary"
                                                        onClick={() => handleChangeUserRole(user._id, "admin")}>
                                                    admin
                                                </button>
                                                &nbsp;
                                                <button className="btn btn-danger"
                                                        onClick={() => handleChangeUserRole(user._id, "normal")}>
                                                    normal
                                                </button>
                                            </>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                }
                <ToastContainer />
            </div>
        </>
    );
};

export default AllUsers;
