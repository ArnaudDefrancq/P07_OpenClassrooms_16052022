import React, {useState } from 'react';
import {POST} from "../../components/api/axios";

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
    }

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

                <button type="submit" value="connection">Connection</button>
            </form>
        </div>
    );
};

export default Login;