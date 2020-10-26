import React, { useState, useEffect, useRef } from 'react'
import { Button, Header, Form, Select } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


const StepFormOne = ({clients}) => {
    const history = useHistory();
    /**Select options */
    const getOptions = clients.map((client) =>      
            <div className='client-options' key={client.id} >
                <div className='row-options' value={client.lastname}>
                    <div>{client.lastname}</div>
                    <div>{client.firstname}</div>
                    <div>{client.phone}</div>
                    <div>{client.mail}</div>
                </div>
            </div>
        );
    ;
    /**Form */
    const [ repairData, setRepairData ] = useState({
        firstname :'',
        lastname : '',
        phone : '',
        phone_two : '',
        mail : '',
        device_name : '',
    });
    
    const handleChange = (e) => {
        setRepairData({...repairData, [e.target.name] : e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('repairSheet/add', repairData , {
            withCredentials: true,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((res) => {
            const order_number = res.data.order_number;
            history.push(`/RepairSheet/edit/${order_number}`)
        })
        .catch((err) => {
            console.log(err);
        })
    };

    /**Form validaton */
    const firstRender = useRef(true);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ disable, setDisabled ] = useState(true);

    useEffect(() => {
        const formValidation = () => {
            if(repairData.lastname === "" || repairData.firstname === "" || repairData.phone === "" || repairData.device_name === ""){
                setErrorMessage('* Vous n\'avez pas complété tous les champs nécessaires')
                return true
            }else{
                setErrorMessage(null);
                return false;
            }
        }
        if(firstRender.current) {
            firstRender.current = false;
            return;
        }
        setDisabled(formValidation())
    }, [ repairData.lastname, repairData.firstname, repairData.phone, repairData.device_name ]);

    return (
        <div className='repair-sheet-form'>
            <Header as='h2'>Choisissez un client</Header>
                <Select placeholder='Choisissez un client' options={getOptions}  />
            <Header as='h2'>Ou Créez un nouveau client</Header>
            <Form
                onSubmit={handleSubmit}
            >
                <Form.Field>
                    <label>Nom</label>
                    <input
                        type='text'
                        name='lastname'
                        onChange={handleChange}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Prénom</label>
                    <input
                        type='text'
                        name='firstname'
                        onChange={handleChange}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Adresse e-mail</label>
                    <input
                        type='text'
                        name='mail'
                        onChange={handleChange}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Téléphone</label>
                    <input
                        type='text'
                        name='phone'
                        onChange={handleChange}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Téléphone 2</label>
                    <input
                        type='text'
                        name='phone_two'
                        onChange={handleChange}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Nom de l'appareil à réparer</label>
                    <input
                        type='text'
                        name='device_name'
                        onChange={handleChange}
                        />
                </Form.Field>
                { errorMessage && <p className='error-message'>{errorMessage}</p>}
                <div className='buttons'>
                    <Button color='teal' disabled={disable}>Valider</Button>
                    <Link to={'/'}>
                        <Button color='red'>Annuler</Button>
                    </Link>
                </div>
            </Form>
        </div>
    );
};

export default StepFormOne;