import React, { useState } from 'react'
import { Button, Form, Checkbox } from 'semantic-ui-react';
import { useParams } from 'react-router';
import Datetime from 'react-datetime';
import axios from 'axios';

import 'moment/locale/fr';
import '../../styles/dateTime.scss';


const StepFourForm = () => {
    let {order_number} = useParams();

    const [ repairData, setRepairData ] = useState ({
        amount_devis: '',
        recall_devis: '',
    });

    /**Date time hooks */
    const [ selectedDate, setSelectedDate ] = useState(null);

    const handleChange = (e) => {
        setRepairData({...repairData, [e.target.name] : e.target.value});
    };
    /**Handle checkbox */
    const [ isAccepted, setIsAccepted] = useState('');
    const handleChangeCheckbox = (e, { value }) => setIsAccepted({value});

    /**Handle click on cancel button*/
    const handleClick = () => {
        window.location.reload(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`repairSheet/stepFour/${order_number}`, {repairData , devis_is_accepted : isAccepted.value , date_devis: selectedDate._d, } , {
            withCredentials: true,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((res) => {
            console.log(res)
            
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
                    <label>Devis accepté ?</label>
                    <Checkbox
                        radio
                        label='oui'
                        name='devis_is_accepted'
                        value='oui'
                        checked={isAccepted.value === 'oui'}
                        onChange={handleChangeCheckbox}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='non'
                        name='devis_is_accepted'
                        value='non'
                        checked={isAccepted.value === 'non'}
                        onChange={handleChangeCheckbox}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Date du devis</label>
                        <Datetime
                            locale="fr"
                            utc={true}
                            placeholder="Saisissez une date" 
                            name="date_devis" 
                            value={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            />
                </Form.Field>
                <Form.Field>
                    <label>Montant du devis</label>
                    <input
                        type='number'
                        name='amount_devis'
                        onChange={handleChange}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Montant Total</label>
                    <input
                        type='number'
                        name='amount_diag'
                        onChange={handleChange}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Nombre de rappels au client</label>
                    <input
                        type='number'
                        name='recall_devis'
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

export default StepFourForm;