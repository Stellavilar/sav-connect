import React, { useState } from 'react';
import logo from '../img/savLogo.png';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import BurgerButtonAdmin from './BurgerButtonAdmin'

const Header = () => {
    const history = useHistory();

    /**Search */
    const [ searchText, setSearchText ] = useState('');
    const [ result, setResults ] = useState([]);
    const [ open, setOpen ] = useState(false)

    const getResults = (e) => {
        const text = searchText;
        const SEARCH_URL = `search/?q=${text}`;
        axios
            .get(SEARCH_URL)
            .then((res) => {
                setResults(res.data)            
            })
            .catch((err) => {
                console.log(err);
            }); 
            return getResults;  
    };
    getResults();
   
    const handleChange = (e) => {
        setSearchText(e.target.value);
        if(e.target.value === ""){
            setOpen(false)
        }else{
            setOpen(true)
        }
    };
   
    const disconnect = () => {
        const token = localStorage.getItem('token');
        axios
            .get('logout', { headers: {
                Authorization: 'Bearer ' + token,
            },        
          }) 
          .then((res) => {
              localStorage.removeItem('token');
              history.push('/');
          })
          .catch((err) => {
              console.log(err)
          })
          return disconnect;
    };

    const handleClick = (e) => {
        const getId = e.target.id;
        history.push(`/RepairSheet/${getId}`);
        window.location.reload(false)
    }
    
    const showResult = result.map((results) => <div className='result-content' key={results.id} onClick={handleClick} id={results.order_number} >{results.order_number} {results.lastname} {results.firstname} {results.device_name} </div>)
    // useEffect(getResults,[])

    return (
        <>
            <div className='navbar'>
                <img src={logo} alt='logo' onClick={()=>history.push('/dashboard')}/>
                    <div className="ui search" >
                        <div className="ui icon input">
                            <input 
                                className="prompt" 
                                type="text" 
                                placeholder="Rechercher une fiche SAV..."
                                onChange={handleChange}
                                />
                            <i className="search icon"></i>
                        </div>
                    </div>
                <div className='profil-buttons'>
                    <Button color='linkedin' onClick={disconnect} >Déconnexion</Button>
                    {/* <i className="fas fa-user-circle"></i> */}
                </div>
                <BurgerButtonAdmin/>
            </div>
                { open ? <div className="results">{showResult}</div> : null}
            </>

    );
};
 export default Header;