import React, { useState, useEffect } from 'react';
import { Header, Segment, List } from 'semantic-ui-react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import QRCode from 'react-qr-code';
import axios from 'axios';

const RepairSheet = () => {
    const history = useHistory();
 
    const [ customerData, setCustomerData ] = useState([]);
    const [ deviceData, setDeviceData ] = useState([]);
    const [ interData, setInterData ] = useState([]);
    const [ devisData, setDevisData ] = useState([]);

    let {id} = useParams();
    const getData = () => {
        axios.get(`repairSheet/stepOne/${id}`)
            .then((res)=> {
                setCustomerData(res.data[0])
            })
            .catch((err) => {
                console.log(err)
            })
            return getData;
    };
    const getDevice = () => {
        axios.get(`repairSheet/stepTwo/${id}`)
            .then((res) => {
                setDeviceData(res.data[0]);
            })
            .catch((err) => {
                console.log(err)
            })
            return getDevice;
    };
    const getInter = () => {
        axios.get(`repairSheet/stepThree/${id}`)
            .then((res) => {
                setInterData(res.data[0]);
            })
            .catch((err) => {
                console.log(err)
            })
            return getDevice;
    };
    const getDevis = () => {
        axios.get(`repairSheet/stepFour/${id}`)
            .then((res) => {
                setDevisData(res.data[0]);
            })
            .catch((err) => {
                console.log(err)
            })
            return getDevis;
    };

    const urlQrcode = `http://localhost:9090/RepairSheet/${id}`
    const qrSize = 180;

    useEffect(getData, []);
    useEffect(getDevice, []);
    useEffect(getInter, []);
    useEffect(getDevis, []);

    return (
        <div className='repair-sheet'>
            <Segment>
                <div className='repair-sheet-one'>
                    <div className='repair-header'>
                        <div></div>
                        <Header as='h2'>Fiche de réparation n° : {customerData.order_number} </Header>
                        <div className='repair-icons'>
                            <i className="fas fa-pencil-alt" onClick={()=> history.push(`/RepairSheet/edit/${id}`)} ></i>
                            <i className="fas fa-print"></i>
                        </div>
                    </div>
                    <div className='repair-sheet-device'>
                        <p className='device'>{customerData.device_name}</p>
                        { !deviceData.device_brand ? <p></p> : <p className='device'>{deviceData.device_brand}</p>}
                    </div>
                    <div className='repair-sheet-options'>
                        <QRCode
                            size={qrSize}
                            value={urlQrcode}
                        />
                        <p>tag</p>
                    </div>
                </div>
                <div className='repair-sheet-client'>
                    <Header as='h3'>Informations Client</Header>
                    <List>
                        <List.Item><span className='repair-span'>Nom: </span> {customerData.lastname} </List.Item>
                        <List.Item><span className='repair-span'>Prénom: </span> {customerData.firstname} </List.Item>
                        <List.Item><span className='repair-span'>Téléphone: </span> {customerData.phone} </List.Item>
                        { !customerData.phone_two ? <p></p> : <List.Item><span className='repair-span'>Téléphone 2: </span> {customerData.phone_two} </List.Item>}
                        { !customerData.mail ? <p></p> : <List.Item><span className='repair-span'>Mail: </span> {customerData.mail} </List.Item>}
                    </List>
                </div>
                <div className='repair-sheet-repair'>
                    <Header as='h3'>Informations Réparation</Header>
                    <List>
                        <List.Item>
                            <List.Content>
                                { !deviceData.panne ? <p></p> : <List.Header>Description panne</List.Header> }
                                <List.Description> {deviceData.panne} </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                { !interData.intervention ? <p></p> : <List.Header>Description Intervention</List.Header>}
                                <List.Description> {interData.intervention} </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                { !interData.date_intervention ? <p></p> : <List.Header>Date d'intervention</List.Header>}
                                <List.Description> {interData.date_intervention} </List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </div>
                <div className='repair-devis'>
                    <Header as='h3'>Informations Devis</Header>
                    <List>
                        <List.Item>
                            <List.Content>
                                { !devisData.devis_is_accepted ? <p></p> : <List.Header>Devis accepté ?</List.Header>}
                                <List.Description> {devisData.devis_is_accepted}  </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                { !devisData.date_devis ? <p></p> : <List.Header>Date devis</List.Header>}
                                <List.Description> {devisData.date_devis} </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                { !devisData.amount_devis ? <p></p> : <List.Header>Montant devis</List.Header>}
                                <List.Description className='amount'>{devisData.amount_devis}{ !devisData.amount_devis ? <p></p> : <p>€</p>}</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </div>
            </Segment>
        </div>
    );
};

export default RepairSheet;