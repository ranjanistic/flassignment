import React, { useContext } from "react";
import UserForm from "./UserForm";
import UsersContext from "../context/UsersContext";

const AddUser = ({ history }) => {
    const { users, setUsers } = useContext(UsersContext);

    const handleOnSubmit = (user) => {
        setUsers([user, ...users]);
        history.push("/");
    };

    return (
        <React.Fragment>
            <UserForm handleOnSubmit={handleOnSubmit} />
        </React.Fragment>
    );
};

export default AddUser;
