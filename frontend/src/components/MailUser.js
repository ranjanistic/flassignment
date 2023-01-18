import React, { useContext, useEffect, useState } from "react";
import MailForm from "./MailForm";
import { useParams } from "react-router-dom";
import api from "../utils/axios";

const MailUser = ({ history }) => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const { id } = useParams();
    useEffect(() => {
        api.get(`/v1/users/${id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                setError(err.data.error);
            });
    }, []);

    const handleOnSubmit = (user) => {
        api.post(`/v1/users/${id}/mail`)
            .then((res) => {
                history.push("/");
            })
            .catch((err) => {
                setError(err.data.error);
            });
    };

    return (
        <div>
            <MailForm
                user={user}
                handleOnSubmit={handleOnSubmit}
                error={error}
            />
        </div>
    );
};

export default MailUser;
