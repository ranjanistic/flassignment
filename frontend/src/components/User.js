import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const User = ({
    _id,
    first_name,
    last_name,
    email,
    phone,
    country_prefix,
    created_at,
    handleRemoveUser,
}) => {
    const history = useHistory();

    return (
        <Card style={{ width: "18rem" }} className="user">
            <Card.Body>
                <Card.Title className="user-title">
                    {first_name} {last_name}
                </Card.Title>
                <div className="user-details">
                    <div>{email}</div>
                    <div>
                        {country_prefix} {phone}
                    </div>
                    <div>{new Date(created_at).toLocaleString()}</div>
                </div>
                <Button
                    variant="primary"
                    onClick={() => history.push(`/edit/${_id}`)}
                >
                    Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => handleRemoveUser(_id)}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
};

export default User;
