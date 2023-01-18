import React, { useContext, useEffect, useState } from "react";
import UserForm from "./UserForm";
import { useParams } from "react-router-dom";
import UsersContext from "../context/UsersContext";
import api from "../utils/axios";

const EditUser = ({ history }) => {
    //  const { users, setUsers } = useContext(UsersContext);
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const { id } = useParams();
    useEffect(() => {
        api.get(`/v1/users/${id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                setError(err.error);
            });
    }, []);

    const handleOnSubmit = (user) => {
        api.put(`/v1/users/${id}`)
            .then((res) => {
                history.push("/");
            })
            .catch((err) => {
                setError(err.error);
            });
    };

    return (
        <div>
            <UserForm
                user={user}
                handleOnSubmit={handleOnSubmit}
                error={error}
            />
        </div>
    );
};

export default EditUser;
