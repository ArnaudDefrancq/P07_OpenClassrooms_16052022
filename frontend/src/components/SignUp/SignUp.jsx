import React, { useEffect, useRef, useState } from 'react';
import {POST} from "../../components/api/axios"
import './SignUp.scss';

// const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {

  const [userSignup, setUserSignup] = useState({
    username: "",
    email: "",
    password: "",
  });

    const registerEmail = useRef();
    const registerPassword = useRef();

    console.log(registerEmail);
    console.log(registerPassword);


      const data = {
        email: registerEmail,   // usersurname: registerSurname.current.value,
        password: registerPassword
      };

      console.log(data);

      const register = async(e) => {
          e.preventDefault();
            try {
              await POST("api/auth/signup", userSignup)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => err.message)
            } catch (err) {
                 console.log(err.message);
             }
          }
           
        

    return (
        <div className='form-container'>
            <h1 className='title'>Inscription</h1>
            <form onSubmit={register}>
             
                <input 
                type="email"
                className="input_container"
                placeholder="Adresse email"
                value={userSignup.email}
                onChange={(e) =>
                  setUserSignup({
                    ...userSignup,
                    email: e.target.value,
                  })
                }
                ref={registerEmail}/>

        
                <input 
                type="password"
                className="input_container"
                placeholder="Mot de passe"
                value={userSignup.password}
                onChange={(e) =>
                  setUserSignup({
                    ...userSignup,
                    password: e.target.value,
                  })
                }
                ref={registerPassword}/>

              <input
                type="password"
                className="input_container"
                placeholder="Confirmer le mot de passe"
              />

            <button type="submit" value="Inscription">Insciption
            </button>

            </form>
        </div>
    );
};

export default SignUp;