import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const MailForm = (props) => {
    const [users, setUsers] = useState([{ email: "Everyone" }, ...props.users]);
    const [mail, setMail] = useState(() => ({
        subject: "Welcome!",
        message: "",
        apikey: "",
        fromMail: "",
        userId: "",
    }));

    const [errorMsg, setErrorMsg] = useState(props.error || "");
    const [successMsg, setSuccessMsg] = useState(props.success || "");

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
            props.handleOnSubmit(mail);
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
            <div>Sending mail to?</div>
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
