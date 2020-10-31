import React, { useState } from 'react'
import { Button, Form, Checkbox } from 'semantic-ui-react';
import { useParams } from 'react-router';
import Datetime from 'react-datetime';
import axios from 'axios';

import 'moment/locale/fr';
import '../../styles/dateTime.scss';

const StepTwoForm = () => {
    let {order_number} = useParams();

    /**Checkbox state */
    const [checkValue, setCheckValue ] = useState('');
    const handleChangeCheckbox = (e, { value }) => setCheckValue({value});


    /**Form */
    const [ deviceData, setDeviceData ] = useState('');
    const [ panneData, setPanneData ] = useState('');

    /**Date time hooks */
    const [ selectedDate, setSelectedDate ] = useState(null);
    
     /**Handle click on cancel button*/
     const handleClick = () => {
        window.location.reload(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`repairSheet/stepTwo/${order_number}`, { panne: checkValue.value + panneData, device_brand: deviceData , interval_repair: selectedDate._d } ,{
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
                onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Modèle de l'appareil à réparer</label>
                    <input
                        type='text'
                        name='device_brand'
                        onChange={(e) => setDeviceData(e.target.value)}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Descriptif Panne</label>
                    <Checkbox
                        radio
                        label='exemple de panne'
                        name='panne'
                        value='exemple de panne / '
                        checked={checkValue.value === 'exemple de panne / '}
                        onChange={handleChangeCheckbox}
                    />                    
                        <textarea
                        name='panne'
                        onChange={(e) => setPanneData(e.target.value)}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Délai de réparation</label>
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
    );
};

export default StepTwoForm;