import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const UserForm = (props) => {
    const [user, setUser] = useState(() => {
        return {
            username: props.user ? props.user.username : "",
            author: props.user ? props.user.author : "",
            quantity: props.user ? props.user.quantity : "",
            price: props.user ? props.user.price : "",
            date: props.user ? props.user.date : "",
        };
    });

    const [errorMsg, setErrorMsg] = useState("");
    const { username, author, price, quantity } = user;

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const values = [username, author, price, quantity];
        let errorMsg = "";

        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== "" && value !== "0";
        });

        if (allFieldsFilled) {
            const user = {
                id: uuidv4(),
                username,
                author,
                price,
                quantity,
                date: new Date(),
            };
            props.handleOnSubmit(user);
        } else {
            errorMsg = "Please fill out all the fields.";
        }
        setErrorMsg(errorMsg);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "quantity":
                if (value === "" || parseInt(value) === +value) {
                    setUser((prevState) => ({
                        ...prevState,
                        [name]: value,
                    }));
                }
                break;
            case "price":
                if (value === "" || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
                    setUser((prevState) => ({
                        ...prevState,
                        [name]: value,
                    }));
                }
                break;
            default:
                setUser((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
        }
    };

    return (
        <div className="main-form">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Enter name of user"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="author">
                    <Form.Label>User Author</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="author"
                        value={author}
                        placeholder="Enter name of author"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="number"
                        name="quantity"
                        value={quantity}
                        placeholder="Enter available quantity"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>User Price</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="price"
                        value={price}
                        placeholder="Enter price of user"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="submit-btn">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default UserForm;
