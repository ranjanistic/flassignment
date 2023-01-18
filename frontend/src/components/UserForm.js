import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../utils/axios";

const UserForm = (props) => {
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        cp: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        if (props.uid) {
            api.get(`/v1/users/${props.uid}`)
                .then((res) => {
                    setErrorMsg("");
                    setUser({
                        email: res.data.email,
                        phone: res.data.phone,
                        cp: res.data.country_prefix,
                        fname: res.data.first_name,
                        lname: res.data.last_name,
                    });
                })
                .catch((err) => {
                    setSuccessMsg("");
                    setErrorMsg(err.response.data.error);
                });
        }
    }, [props.uid]);
    const { fname, lname, email, phone, cp } = user;

    const handleOnCreate = (user) => {
        api.post(`/v1/users/`, { ...user })
            .then((res) => {
                setErrorMsg("");
                setSuccessMsg("Added.");
            })
            .catch((err) => {
                setSuccessMsg("");
                setErrorMsg(err.response.data.error);
            });
    };
    const handleOnUpdate = (user, id) => {
        api.put(`/v1/users/${id}`, { ...user })
            .then((res) => {
                setErrorMsg("");
                setSuccessMsg("User updated.");
            })
            .catch((err) => {
                setSuccessMsg("");
                setErrorMsg(err.response.data.error);
            });
    };

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
            if (props.uid) {
                handleOnUpdate(user, props.uid);
            } else {
                handleOnCreate(user);
            }
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
                        disabled={props.uid ? true : false}
                        placeholder="User's email address"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="cp">
                    <Form.Label>User Phone</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="cp"
                        value={cp}
                        placeholder="Country dial code (+91,+1, etc.)"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Control
                        className="input-control"
                        type="tel"
                        name="phone"
                        value={phone}
                        placeholder="User's phone number (no dial code)"
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
                    {props.uid ? "Update" : "Create"}
                </Button>
            </Form>
        </div>
    );
};

export default UserForm;
