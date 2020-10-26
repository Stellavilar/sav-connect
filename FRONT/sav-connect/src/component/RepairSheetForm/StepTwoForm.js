import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useParams } from 'react-router';
import axios from 'axios';

const StepTwoForm = () => {
    let {order_number} = useParams();

    /**Form */
    const [ repairData, setRepairData ] = useState({
        device_brand :'',
        interval_repair : '',
        panne : '',
    });
    
    const handleChange = (e) => {
        setRepairData({...repairData, [e.target.name] : e.target.value});
    };
     /**Handle click on cancel button*/
     const handleClick = () => {
        window.location.reload(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`repairSheet/stepTwo/${order_number}`, repairData , {
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
                        onChange={handleChange}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Descriptif Panne</label>
                    <input
                        name='panne'
                        onChange={handleChange}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Délai de réparation</label>
                    <input
                        name='interval_repair'
                        onChange={handleChange}
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