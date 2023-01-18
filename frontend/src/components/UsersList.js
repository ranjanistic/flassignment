import React, { useContext, useState } from "react";
import _ from "lodash";
import User from "./User";
import UsersContext from "../context/UsersContext";
import api from "../utils/axios";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    useEffect(() => {
        api.get(`/v1/users`)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                setErrorMsg(err.error);
            });
    }, []);

    const handleRemoveUser = (id) => {
        api.delete(`/v1/users/${id}`)
            .then((res) => {
                api.get(`/v1/users`)
                    .then((res) => {
                        setUsers(res.data);
                    })
                    .catch((err) => {
                        setErrorMsg(err.error);
                    });
            })
            .catch((err) => {
                setErrorMsg(err.error);
            });
    };

    return (
        <React.Fragment>
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
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
                    <p className="message">
                        No users available. Please add some users.
                    </p>
                )}
            </div>
        </React.Fragment>
    );
};

export default UsersList;
