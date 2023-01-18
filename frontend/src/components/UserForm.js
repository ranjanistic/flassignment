import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const UserForm = (props) => {
    const [user, setUser] = useState(() => {
        return {
            fname: props.user ? props.user.first_name : "",
            lname: props.user ? props.user.last_name : "",
            email: props.user ? props.user.email : "",
            phone: props.user ? props.user.phone : "",
            cp: props.user ? props.user.country_prefix : "",
        };
    });

    const [errorMsg, setErrorMsg] = useState(props.error || "");
    const [successMsg, setSuccessMsg] = useState(props.success || "");

    const { fname, lname, email, phone, cp } = user;
    const handleOnSubmit = (event) => {
        event.preventDefault();
        const values = [fname, lname, email, phone, cp];
        let errorMsg = "";

        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== "" && value !== "0";
        });

        if (allFieldsFilled) {
            const user = {
                fname,
                lname,
                email,
                phone,
                cp,
            };
            props.handleOnSubmit(user);
        } else {
            errorMsg = "Please fill out all the fields.";
        }
        setSuccessMsg("");
        setErrorMsg(errorMsg);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="main-form">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            {successMsg && <p className="successMsg">{successMsg}</p>}
            <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="User's email address"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="cp">
                    <Form.Label>User Phone</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="tel"
                        name="cp"
                        value={cp}
                        placeholder="Country dial code (+91)"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Control
                        className="input-control"
                        type="tel"
                        name="phone"
                        value={phone}
                        placeholder="User's phone"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="fname">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="fname"
                        value={fname}
                        placeholder="First name of user"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="lname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="lname"
                        value={lname}
                        placeholder="Last name of user"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="submit-btn">
                    Create
                </Button>
            </Form>
        </div>
    );
};

export default UserForm;
