import React from "react";
import UserForm from "./UserForm";
import { useParams } from "react-router-dom";

const EditUser = () => {
    const { id } = useParams();

    return (
        <React.Fragment>
            <UserForm uid={id} />
        </React.Fragment>
    );
};

export default EditUser;
