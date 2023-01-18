import React, { useState, useEffect } from "react";
import _ from "lodash";
import User from "./User";
import UsersContext from "../context/UsersContext";
import api from "../utils/axios";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        api.get(`/v1/users/`)
            .then((res) => {
                setErrorMsg("");
                setSuccessMsg(`${res.data.users.length} users exist.`);
                setUsers(res.data.users);
            })
            .catch((err) => {
                setSuccessMsg("");
                setErrorMsg(err.response.data.error);
            });
    }, []);

    const handleRemoveUser = (id) => {
        api.delete(`/v1/users/${id}`)
            .then((res) => {
                api.get(`/v1/users/`)
                    .then((res) => {
                        setErrorMsg("");
                        setSuccessMsg("User deleted.");
                        setUsers(res.data.users);
                    })
                    .catch((err) => {
                        setSuccessMsg("");

                        setErrorMsg(err.response.data.error);
                    });
            })
            .catch((err) => {
                setSuccessMsg("");
                setErrorMsg(err.response.data.error);
            });
    };

    return (
        <React.Fragment>
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            {successMsg && <p className="successMsg">{successMsg}</p>}
            <div className="user-list">
                {!_.isEmpty(users) ? (
                    users.map((user) => (
                        <User
                            key={user._id}
                            {...user}
                            handleRemoveUser={handleRemoveUser}
                        />
                    ))
                ) : (
                    <p className="message">No users available.</p>
                )}
            </div>
        </React.Fragment>
    );
};

export default UsersList;
