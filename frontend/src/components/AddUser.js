import React, { useState } from "react";
import UserForm from "./UserForm";
import api from "../utils/axios";

const AddUser = () => {
    return (
        <React.Fragment>
            <UserForm uid={null} />
        </React.Fragment>
    );
};

export default AddUser;
