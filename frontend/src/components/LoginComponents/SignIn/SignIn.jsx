import React, {useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const refLoginError = useRef();

    const handleLogin = (e) => {
        e.preventDefault();

        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            withCredentials: true,
            data: {
                email,
                password
            },
        })
        .then((res) =>  {
            console.log(res);
            if (res) {
                window.location = '/trending';
            } else {
               return console.log('pas connecter');
            }
        })
        .catch ((err) => { 
            refLoginError.current.textContent = "probleme";
        console.log(err)})
    };

    return (
        <div className='form-container'>
            <h1 className='title'>Connection</h1>
            <form onSubmit={handleLogin}>
                <input 
                type="email" 
                placeholder='Adresse mail' 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required/>
                <br />

                <input 
                type="password" 
                placeholder='Mot de passe'
                onChange={(e) => setPassword(e.target.value)}
                value={password} 
                required/>
                <div ref={refLoginError}></div>

                <button type="submit" value="connection" className='btn-conection'>Connection</button>
            </form>
        </div>
    );
};

export default Login;