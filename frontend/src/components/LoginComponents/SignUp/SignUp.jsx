import axios from 'axios';
import React, { useState } from 'react';
import { useRef } from 'react';
import SignIn from '../SignIn/SignIn'



// const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {
  // state pour s'inscrire
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Input Ref
  const refSignupPseudo = useRef();
  const refSignupEmail = useRef();
  const refSignupPassword = useRef();

  const refSignupPseudoError = useRef();
  const refSignupEmailError = useRef();
  const refSignupPasswordError = useRef();

  // Fonction pour validé les input
  // const checkPseudo = (pseudo) => {
  //   console.log(pseudo);
  //    if (/^[a-zA-Z0-9\s]{3,40}$/.test(pseudo)) {
  //      refSignupPseudoError.current.textContent  = ' ';
  //   } else {
  //       refSignupPseudoError.current.textContent = 'Votre pseudo doit faire entre 2 et 30 caractères';
  //     return false
  //   }
  // };

  // const checkEmail = (mail) => {
  //   console.log(mail);
  //   // console.log(nodeError);

  //   if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail)) {
  //     refSignupEmailError.current.textContent = ""
  //   } else {
  //     refSignupEmailError.current.textContent = 'Email incorrect';
  //     return false
  //   }
  // }

  // const checkPassword = (mdp) => {
  //   console.log(mdp);
  //   if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/.test(mdp)) {
  //     refSignupPasswordError.current.textContent = "";
  //   } else {
  //     console.log('pasbon');
  //     refSignupPasswordError.current.textContent = 'Votre mot de passe doit contenir 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spéciale';
  //     return false
  //   }
  // }


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
                  setPseudo(e.target.value);
                  // checkPseudo(e.target.value)
                }}
                value={pseudo}
                required
                ref={refSignupPseudo}
                />
                <div ref={refSignupPseudoError} className='signup-error'></div>
             
                <input 
                type="email"
                className="input_container"
                placeholder="Adresse email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  // checkEmail(e.target.value)
                }}
                value={email}
                required
                ref={refSignupEmail}
                // onBlur={(e) => {
                  
                //   checkEmail(e.target.value)}}
                />
                <div ref={refSignupEmailError} className='signup-error'></div>

        
                <input 
                type="password"
                className="input_container"
                placeholder="Mot de passe"
                onChange={(e) => {
                  setPassword(e.target.value);
                  // checkPassword(e.target.value)
                }}
                value={password}
                required
                ref={refSignupPassword}
                />
                <div ref={refSignupPasswordError} className='signup-error'></div>

            <button type="submit" value="Inscription">Insciption
            </button>

            </form>
        </div>
        )}
        </>
    );
};

export default SignUp;