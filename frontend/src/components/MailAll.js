import React, { useContext, useState } from "react";
import MailForm from "./MailForm";
import api from "../utils/axios";

const MailAll = ({ history }) => {
    const [error, setError] = useState("");

    const handleOnSubmit = (mail) => {
        api.post(`/v1/users/mail`, { ...mail })
            .then((res) => {
                history.push("/");
            })
            .catch((err) => {
                setError(err.data.error);
            });
    };

    return (
        <React.Fragment>
            <MailForm handleOnSubmit={handleOnSubmit} error={error} />
        </React.Fragment>
    );
};

export default MailAll;
