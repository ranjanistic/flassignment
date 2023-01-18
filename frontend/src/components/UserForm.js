import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const UserForm = (props) => {
    const [user, setUser] = useState(() => {
        return {
            fname: props.user ? props.user.fname : "",
            lname: props.user ? props.user.lname : "",
            email: props.user ? props.user.email : "",
            phone: props.user ? props.user.phone : "",
            cp: props.user ? props.user.cp : "",
        };
    });

    const [errorMsg, setErrorMsg] = useState("");
    const { fname, lname, email, phone, cp } = user;
    if (props.error) {
        setErrorMsg(props.error);
    }
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
                        type="number"
                        name="cp"
                        value={cp}
                        placeholder="Country dial code (+91)"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Control
                        className="input-control"
                        type="number"
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
