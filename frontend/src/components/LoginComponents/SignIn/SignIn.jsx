import React, {useState } from 'react';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

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
            if (res.data.err) {
                emailError.innerHTML = res.data.errors.message;
                passwordError.innerHTML = res.data.err.password;
            } else {
                window.location = '/trending';
            }
        })
        .catch ((err) => console.log(err))
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
                <div id='emailError'></div>
                <br />

                <input 
                type="password" 
                placeholder='Mot de passe'
                onChange={(e) => setPassword(e.target.value)}
                value={password} 
                required/>
                <div id='passwordError'></div>

                <button type="submit" value="connection" >Connection</button>
            </form>
        </div>
    );
};

export default Login;