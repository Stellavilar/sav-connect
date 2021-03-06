import React, { useState } from 'react';
import { Button, Header, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../img/savLogo.png';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const history = useHistory();
    /**Error messages */
    const [ errorMessage, setErrorMessage ] = useState(null);
    /**Get User data */
    const [ userProfil, setUserProfil ] = useState({ mail: '', password: '' });

    const handleChange = (e) => {
        setUserProfil({...userProfil, [e.target.name] : e.target.value})
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('login', userProfil, {
            withCredentials: true,
            headers: {
                // eslint-disable-next-line
                Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
            }
        })
        .then((res) => {
            if(res.data.token){
                if(res.data.isAdmin === true){
                    history.push('/dashboard');
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('isAdmin', true);
                    window.location.reload(false);

                }else if(res.data.isAdmin === false){
                    history.push('/dashboard');
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('isAdmin', false);
                    window.location.reload(false);

                }
            }else{
                setErrorMessage(' * Identifiants incorrects')
            }
        })
        .catch((err) => {
            console.log(err);
        })
    };
    
    return (
       <div className='login'>
           <img src={logo} alt='logo'/>
           <Header as='h2'>Se connecter</Header>
           <Form
            onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Adresse e-mail</label>
                    <input
                        type='text'
                        name='mail'
                        onChange={handleChange}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Mot de passe</label>
                    <input
                        type='password'
                        name='password'
                        onChange={handleChange}
                        />
                </Form.Field>
                { errorMessage && <p className='error-message'>{errorMessage}</p> }
                <div className='buttons'>
                    <Button color='teal'>Valider</Button>
                    <Link to={'/'}>
                        <Button color='red'>Annuler</Button>
                    </Link>
                </div>
           </Form>
       </div> 
    );
};

export default Login;