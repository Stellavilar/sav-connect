import React from 'react';
import logo from '../img/savLogo.png';
import { Button, Search } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Header = () => {
    const history = useHistory();

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

    return (
        <div className='navbar'>
            <img src={logo} alt='logo' onClick={()=>history.push('/dashboard')}/>
            <Search></Search>
            <div className='profil-buttons'>
                <Button color='linkedin' onClick={disconnect} >Déconnexion</Button>
                {/* <i className="fas fa-user-circle"></i> */}
            </div>
        </div>
    );
};
 export default Header;