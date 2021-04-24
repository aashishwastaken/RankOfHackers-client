import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";

import '../../App.css';
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";

function Register() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const newUser = { email, password, passwordCheck, displayName };
            await axios.post(`${process.env.REACT_APP_BASE_URL}users/register`, newUser);
            const loginResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}users/login`, {
                email, password
            });
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }

    };

    return (
        <div className="register col">
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form className="mar-pad-2 col" onSubmit={submit}>
                <div className="row">
                    <label className="mar-pad-2">Email: </label>
                    <input type="email" id="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="row">
                    <label className="mar-pad-2">Password: </label>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm password" onChange={e => setPasswordCheck(e.target.value)} />
                </div>
                <div className="row">
                    <label className="mar-pad-2" >Display name </label>
                    <input type="text" id="dsplay-name" onChange={e => setDisplayName(e.target.value)} />
                </div>  <br />
                <input type="submit" value="Register" className="btn btn-primary" />
            </form>
        </div>
    );
}

export default Register;