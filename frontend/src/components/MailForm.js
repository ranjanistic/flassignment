import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const MailForm = (props) => {
    const [user, setUser] = useState(() => {
        return {
            fname: props.user ? props.user.first_name : "",
            lname: props.user ? props.user.last_name : "",
            email: props.user ? props.user.email : "",
        };
    });
    const [mail, setMail] = useState(() => ({ subject: "", message: "" }));

    const [errorMsg, setErrorMsg] = useState("");
    const { subject, message, apikey, fromMail } = mail;
    if (props.error) {
        setErrorMsg(props.error);
    }
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
            };
            props.handleOnSubmit(mail);
        } else {
            errorMsg = "Please fill the non-optional fields.";
        }
        setErrorMsg(errorMsg);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            default:
                return;
            /*                setUser((prevState) => ({
                    ...prevState,
                    [name]: value,
                })); */
        }
    };

    return (
        <div className="main-form">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <div>Sending mail to: {user ? user.email : "Everyone"}</div>
            <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId="subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="subject"
                        value="Welcome!"
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
                        value=""
                        placeholder="Write a message"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="sendgrid">
                    <Form.Label>(Optional) Sendgrid details</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="fromMail"
                        value=""
                        placeholder="Sendgrid 'from' address"
                    />
                    <Form.Control
                        className="input-control"
                        type="password"
                        name="apikey"
                        value=""
                        placeholder="Sendgrid API key"
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
