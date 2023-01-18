import React, { useState, useEffect } from "react";
import _ from "lodash";
import User from "./User";
import api from "../utils/axios";

const SearchUsers = () => {
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [query, setQuery] = useState("");

    const handleRemoveUser = (id) => {
        api.delete(`/v1/users/${id}`)
            .then((res) => {
                setErrorMsg("");
                setSuccessMsg("User deleted.");
            })
            .catch((err) => {
                setSuccessMsg("");
                setErrorMsg(err.data.error);
            });
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const values = [query];
        let errorMsg = "";

        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== "";
        });

        if (allFieldsFilled) {
            api.get(`/v1/users/search/?query=${query}`)
                .then((res) => {
                    setErrorMsg("");
                    setSuccessMsg(`${res.data.users.length} users found.`);
                    setUsers(res.data.users);
                })
                .catch((err) => {
                    setSuccessMsg("");
                    setErrorMsg(err.data.error);
                });
        } else {
            errorMsg = "Type something to search.";
        }
        setSuccessMsg("");
        setErrorMsg(errorMsg);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setQuery(value);
    };

    return (
        <React.Fragment>
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            {successMsg && <p className="successMsg">{successMsg}</p>}
            <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId="fname">
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="query"
                        value={query}
                        placeholder="Search by email,phone or anything."
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="submit-btn">
                    Search
                </Button>
            </Form>
            <div className="user-list">
                {!_.isEmpty(users) ? (
                    users.map((user) => (
                        <User
                            key={user._id}
                            {...user}
                            handleRemoveUser={handleRemoveUser}
                        />
                    ))
                ) : (
                    <p className="message">
                        Type in the input and hit the 'Search' button.
                    </p>
                )}
            </div>
        </React.Fragment>
    );
};

export default SearchUsers;
