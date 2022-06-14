import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {POST} from "../../api/axios";

const Login = () => {

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
      });

    const login = async(e) => {
        e.preventDefault();
        try {
            await POST("api/auth/login", userLogin)
            .then(res => console.log(res, 'connecter'))
            .catch (err => console.log(err.message))
        } catch (err) {
            console.log(err.message);
        }
    };

    const history = useNavigate();

    return (
        <div className='form-container'>
            <h1 className='title'>Connection</h1>
            <form onSubmit={login}>
                <input 
                type="email" 
                placeholder='Adresse mail' 
                onChange={(e) =>
                    setUserLogin({
                      ...userLogin,
                      email: e.target.value,
                    })
                }
                value={userLogin.email}
                required/>

                <input 
                type="password" 
                placeholder='Mot de passe' 
                onChange={(e) =>
                    setUserLogin({
                      ...userLogin,
                      password: e.target.value,
                    })
                }
                value={userLogin.password}
                required/>

                <button type="submit" value="connection" onClick={() => {history.push("/newfeeds")}}>Connection</button>
            </form>
        </div>
    );
};

export default Login;