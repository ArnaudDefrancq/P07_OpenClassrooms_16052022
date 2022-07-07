import React from 'react';
import Moment from "react-moment";
import 'moment/locale/fr';
import { UidContext } from '../../../../AppContext';
import { useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";



const Com = ({post, data}) => {

    const uid = useContext(UidContext);

    const user = document.cookie.split("=")

    const config = {
        headers: {
            "authorization": `bearer ${user[1]}`
        }
    };

    const deleteCom = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}api/com/${data.id}`, config)
        .then(() => console.log('com effacé'))
        .catch(err => console.log(err));

    }
    return (
        <>
                <li className='card-com'>
                    <div className='coms'>
                        <div className='coms-container'>
                            <p className='author-post'>{data.pseudo}</p>
                            <p className='com-content'>{data.content}</p>
                        </div>                  
                        {data.UserId === uid  && (<button className='delete-com' onClick={deleteCom}><FontAwesomeIcon icon={faTrash} /></button>)}
                    </div>
                        <p className='date-com'><Moment local="fr" fromNow >{data.createdAt}</Moment></p>
                </li>
        
        </>
    );
    
};

export default Com;