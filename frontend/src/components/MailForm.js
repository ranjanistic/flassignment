import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../utils/axios";

const MailForm = () => {
    const [users, setUsers] = useState([]);
    const [mail, setMail] = useState({
        subject: "Welcome!",
        message: "",
        apikey: "",
        fromMail: "",
        userId: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        api.get(`/v1/users/`)
            .then((res) => {
                setErrorMsg("");
                setUsers([...res.data.users]);
            })
            .catch((err) => {
                setSuccessMsg("");
                setErrorMsg(err.response.data.error);
            });
    }, []);

    const { subject, message, apikey, fromMail, userId } = mail;
    const handleOnSubmit = (event) => {
        event.preventDefault();
        const values = [subject, message];
        let errorMsg = "";

        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== "";
        });

        if (allFieldsFilled) {
            const mail = {
                subject,
                message,
                apikey,
                fromMail,
                userId,
            };
            let url = `/v1/users/mail`;
            if (mail.userId) {
                url = `/v1/users/${mail.userId}/mail`;
            }
            api.post(url, { ...mail })
                .then((res) => {
                    setErrorMsg("");
                    setSuccessMsg(
                        "Mail sent. Please note that the email may not reach its destination due to problems with SendGrid. Rest assured, the server as recorded your message & has requested Sendgrid from its side."
                    );
                })
                .catch((err) => {
                    setSuccessMsg("");
                    setErrorMsg(err.response.data.error);
                });
        } else {
            errorMsg = "Please fill the non-optional fields.";
        }
        setSuccessMsg("");
        setErrorMsg(errorMsg);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMail((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="main-form">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            {successMsg && <p className="successMsg">{successMsg}</p>}
            <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId="to">
                    <Form.Select
                        name="userId"
                        aria-label="Destination"
                        onChange={handleInputChange}
                    >
                        {users.map((user) => (
                            <option value={user._id || ""}>{user.email}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="subject"
                        value={subject}
                        placeholder="Email subject"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="message">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="message"
                        value={message}
                        placeholder="Write a message"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="fromMail">
                    <Form.Label>(Optional) Sendgrid details</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="fromMail"
                        value={fromMail}
                        placeholder="Sendgrid 'from' address"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="apikey">
                    <Form.Control
                        className="input-control"
                        type="password"
                        name="apikey"
                        value={apikey}
                        placeholder="Sendgrid API key"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="submit-btn">
                    Send Email
                </Button>
            </Form>
        </div>
    );
};

export default MailForm;
