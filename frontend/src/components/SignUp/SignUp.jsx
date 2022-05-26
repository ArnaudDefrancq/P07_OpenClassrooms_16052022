import React from 'react';
import './SignUp.scss';

const SignUp = () => {
    return (
        <div className='form-container'>
            <form>

                
                <input type="text" id='name' placeholder='Nom' required/>

                <input type="text" id='name' placeholder='Prénom' required/>

                <input type="email" id='email' placeholder='Adresse mail' required />

           
                <input type="text" id='password' placeholder='Mot de passe' required />

                
                <input type="text" id="validPassword" placeholder='Confirmer le mot de passe' required />

                <button type="submit" value="Inscription">Insciption</button>

            </form>
            <p>Pas encore inscrit ?</p>
        </div>
    );
};

export default SignUp;