import React, { useRef, useState } from 'react';
import {POST} from "../../components/api/axios";
import { useNavigate } from 'react-router-dom';


// const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {

  const [userSignup, setUserSignup] = useState({
    pseudo: "",
    email: "",
    password: "",
  });

    const registerEmail = useRef();
    const registerPassword = useRef();
    const registerPseudo = useRef();

    const register = async(e) => {
      e.preventDefault();
      try {
        await POST("api/auth/signup", userSignup)
          .then((res) => {
            console.log(res, 'inscrit');
            })
          .catch((err) => err.message)
            } 
      catch (err) {console.log(err.message);}
    };

    const history = useNavigate();
    

    
        

    return (
        <div className='form-container'>
            <h1 className='title'>Inscription</h1>
            <form onSubmit={register}>

                <input 
                type="text"
                className='input_container'
                placeholder='Pseudo'
                value={userSignup.pseudo}
                onChange={(e) =>
                  setUserSignup({
                    ...userSignup,
                    pseudo: e.target.value,
                  })
                }
                ref={registerPseudo} 
                required/>
             
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
                ref={registerEmail}
                required/>

        
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
                ref={registerPassword}
                required/>

            <button type="submit" value="Inscription" onClick={() => {history.push("/newfeeds")}}>Insciption
            </button>

            </form>
        </div>
    );
};

export default SignUp;