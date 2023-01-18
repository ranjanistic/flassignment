import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const User = ({
    id,
    username,
    author,
    price,
    quantity,
    date,
    handleRemoveUser,
}) => {
    const history = useHistory();

    return (
        <Card style={{ width: "18rem" }} className="user">
            <Card.Body>
                <Card.Title className="user-title">{username}</Card.Title>
                <div className="user-details">
                    <div>Author: {author}</div>
                    <div>Quantity: {quantity} </div>
                    <div>Price: {price} </div>
                    <div>Date: {new Date(date).toDateString()}</div>
                </div>
                <Button
                    variant="primary"
                    onClick={() => history.push(`/edit/${id}`)}
                >
                    Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => handleRemoveUser(id)}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
};

export default User;
