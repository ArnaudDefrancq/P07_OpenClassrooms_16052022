import axios from 'axios';
import React, { useState } from 'react';
import SignIn from '../SignIn/SignIn'



// const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {

  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    
    e.preventDefault();

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
      data: {
        pseudo: pseudo,
        email: email,
        password: password
      }
    })
    .then((res) => {
      if (res) {
        setFormSubmit(true);
      }
    })
    .catch((err) => console.log(err))

  };  

    return (
        <>
        {formSubmit ?
        (<>
         <SignIn />
         <h2>Vous êtes incrit ! Veulliez vous connecter !</h2>
        </>
        ) : (
      <div className='form-container'>
            <h1 className='title'>Inscription</h1>
            <form onSubmit={handleSubmit}>

                <input 
                type="text"
                className='input_container'
                placeholder='Pseudo' 
                onChange={(e) => {
                  setPseudo(e.target.value)
                }}
                value={pseudo}
                required/>
             
                <input 
                type="email"
                className="input_container"
                placeholder="Adresse email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                value={email}
                required/>
                <div id='emailError'></div>

        
                <input 
                type="password"
                className="input_container"
                placeholder="Mot de passe"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                value={password}
                required/>

            <button type="submit" value="Inscription">Insciption
            </button>

            </form>
        </div>
        )}
        </>
    );
};

export default SignUp;