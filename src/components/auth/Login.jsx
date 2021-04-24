import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Switch from '@material-ui/core/Switch';

import '../../App.css';
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [adminOrNot, setAdminOrNot] = useState(false);

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const handleSwitch = (event) => {
        setAdminOrNot(prev=>!prev);
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password };
            let loginResponse ;
            if(adminOrNot){
             loginResponse = await axios.post("http://localhost:5000/admins/login", loginUser);
            }
            else{
             loginResponse = await axios.post("http://localhost:5000/users/login", loginUser);
            }

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
        <div className="login col">
            <h2>Login</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}

            <div className="row">
                <label className="mar-pad-2">Admin</label>
                <Switch
                    checked={adminOrNot}
                    onChange={handleSwitch}
                    color="primary"
                    name="switch"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                /></div>
            <form className="col" onSubmit={submit}>

                <div className="row">
                    <label className="mar-pad-2">Email: </label>
                    <input type="email" id="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="row">
                    <label className="mar-pad-2">Password: </label>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
                    </div>
<br/>
                    <input  type="submit" value="Login" className="btn btn-primary mar-pad-2" />
                
            </form>
        </div>
    );
}

export default Login;