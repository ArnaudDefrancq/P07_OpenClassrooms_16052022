import React from 'react';
import { UidContext } from '../../../../AppContext';
import { useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import 'moment/locale/fr';



const Com = ({com}) => {
    const uid = useContext(UidContext);

    const user = document.cookie.split("=")

    const config = {
        headers: {
            "authorization": `bearer ${user[1]}`
        }
    };

    const deleteCom = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}api/com/${com.id}`, config)
        .then(() => console.log('com effacé'))
        .catch(err => console.log(err));

    }
    return (
        <>
                <li className='card-com'>
                    <div className='coms'>
                        <div className='coms-container'>
                            <p className='author-post'>{com.User.pseudo}</p>
                            <p className='com-content'>{com.content}</p>
                        </div>  
                        <p><Moment local="fr" fromNow >{com.createdAt}</Moment></p>                
                        {com.UserId === uid  && (<button className='delete-com' onClick={deleteCom}><FontAwesomeIcon icon={faTrash} /></button>)}
                    </div>
                </li>
        
        </>
    );
    
};

export default Com;