import React, { useState } from 'react';
import SignUp from '../SignUp/SignUp';
import Login from "../Login/Login";

const ConnectModal = () => {

    const [signUp, setSignUp] = useState(true);

    return (
        <div className='connectModal'>
            <div className='btn-container'>
                <button 
                className='btn-1'
                style={{background: signUp ? "#ffffff" : "#d2d2d2"}}
                onClick={() => setSignUp(true)}
                >S'inscrire</button>
                <button 
                className='btn-2'
                style={{background: signUp ? "#d2d2d2" : "#ffffff"}}
                onClick={() => setSignUp(false)}
                >Se connecter</button>
            </div>
            {signUp ? <SignUp /> : <Login />}
        </div>
    );
};

export default ConnectModal;