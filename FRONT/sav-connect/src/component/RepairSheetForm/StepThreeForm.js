import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useParams } from 'react-router';
import Datetime from 'react-datetime';
import axios from 'axios';

import 'moment/locale/fr';
import '../../styles/dateTime.scss';

const StepThreeForm = () => {
    let {order_number} = useParams();

    const [ getInter, setGetInter ] = useState ('');

    /**select date */
    const [ selectedDate, setSelectedDate ] = useState(null);

    /**Handle click on cancel button*/
    const handleClick = () => {
        window.location.reload(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`repairSheet/stepThree/${order_number}`, { intervention: getInter , date_intervention: selectedDate._d } , {
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
                        onChange={(e) => setGetInter(e.target.value)}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Date d'ntervention</label>
                    <Datetime
                            locale="fr"
                            utc={true}
                            placeholder="Saisissez une date" 
                            name="date_devis" 
                            value={selectedDate}
                            onChange={date => setSelectedDate(date)}
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