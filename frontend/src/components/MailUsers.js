import React, { useEffect, useState } from "react";
import MailForm from "./MailForm";
import api from "../utils/axios";

const MailUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    useEffect(() => {
        api.get(`/v1/users/`)
            .then((res) => {
                setError("");
                setUsers(res.data.users);
            })
            .catch((err) => {
                setSuccess("");
                setError(err.data.error);
            });
    }, []);

    const handleOnSubmit = (mail) => {
        let url = `/v1/users/mail`;
        if (mail.userId) {
            url = `/v1/users/${mail.userId}/mail`;
        }
        api.post(url, { ...mail })
            .then((res) => {
                setError("");
                setSuccess(
                    "Mail sent. Please note that the email may not reach its destination due to problems with SendGrid. Rest assured, the server as recorded your message & has requested Sendgrid from its side."
                );
            })
            .catch((err) => {
                setSuccess("");
                setError(err.data.error);
            });
    };

    return (
        <div>
            <MailForm
                users={users}
                handleOnSubmit={handleOnSubmit}
                error={error}
                success={success}
            />
        </div>
    );
};

export default MailUsers;
