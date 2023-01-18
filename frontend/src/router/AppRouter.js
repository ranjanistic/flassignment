import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "../components/Header";
import AddUser from "../components/AddUser";
import UsersList from "../components/UsersList";
import useApi from "../hooks/useApi";
import EditUser from "../components/EditUser";
import SearchUsers from "../components/SearchUsers";
import MailUsers from "../components/MailUsers";

import UsersContext from "../context/UsersContext";

const AppRouter = () => {
    const [users, setUsers] = useApi("users", []);

    return (
        <BrowserRouter>
            <div>
                <Header />
                <div className="main-content">
                    <UsersContext.Provider value={{ users, setUsers }}>
                        <Switch>
                            <Route
                                component={UsersList}
                                path="/"
                                exact={true}
                            />
                            <Route component={AddUser} path="/add" />
                            <Route component={MailUsers} path="/mail" />
                            <Route component={EditUser} path="/edit/:id" />
                            <Route component={SearchUsers} path="/search" />
                            <Route component={() => <Redirect to="/" />} />
                        </Switch>
                    </UsersContext.Provider>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;
