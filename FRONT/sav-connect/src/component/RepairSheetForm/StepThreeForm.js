import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useParams } from 'react-router';
import axios from 'axios';

const StepThreeForm = () => {
    let {order_number} = useParams();

    const [ repairData, setRepairData ] = useState ({ intervention:'', date_intervention:'' });

    const handleChange = (e) => {
        setRepairData({...repairData, [e.target.name] : e.target.value});
    };
    /**Handle click on cancel button*/
    const handleClick = () => {
        window.location.reload(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`repairSheet/stepThree/${order_number}`, repairData , {
            withCredentials: true,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((res) => {
            console.log(res)
            console.log('validé')
        })
        .catch((err) => {
            console.log(err);
        })
    };
   
    return (
        <div className='tab-form'>
            <Form
                onSubmit={handleSubmit} 
            >
                <Form.Field>
                    <label>Détails de l'intervention</label>
                    <input
                        type='text'
                        name='intervention'
                        onChange={handleChange}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Date d'ntervention</label>
                    <input
                        type='text'
                        name='date_intervention'
                        onChange={handleChange}
                        />
                </Form.Field>
                <div className='buttons'>
                    <Button color='teal'>Valider</Button>
                    <Button color='red' onClick={handleClick}>Annuler</Button>
                </div>
            </Form>
        </div>
    )
};

export default StepThreeForm;