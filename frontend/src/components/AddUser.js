import React, { useContext, useState } from "react";
import UserForm from "./UserForm";
import UsersContext from "../context/UsersContext";
import api from "../utils/axios";

const AddUser = ({ history }) => {
    //    const { users, setUsers } = useContext(UsersContext);
    const [error, setError] = useState("");

    const handleOnSubmit = (user) => {
        api.post(`/v1/users/`, { ...user })
            .then((res) => {
                history.push("/");
            })
            .catch((err) => {
                setError(err.data.error);
            });
    };

    return (
        <React.Fragment>
            <UserForm handleOnSubmit={handleOnSubmit} error={error} />
        </React.Fragment>
    );
};

export default AddUser;
