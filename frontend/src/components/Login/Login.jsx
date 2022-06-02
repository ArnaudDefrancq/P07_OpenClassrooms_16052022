import React from 'react';
import "./Login.scss";

const Login = () => {
    return (
        <div className='form-container'>
            <h1 className='title'>Connection</h1>
            <form>
                <input type="email" placeholder='Adresse mail' required/>

                <input type="text" placeholder='Mot de passe' required/>

                <button type="submit" value="connection">Connection</button>
            </form>
            <p>Pas encore inscrit ?</p>
        </div>
    );
};

export default Login;