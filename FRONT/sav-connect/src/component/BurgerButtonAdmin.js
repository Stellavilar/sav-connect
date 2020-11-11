import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const BurgerButtonAdmin = () => {
    const history = useHistory();

    return (
        <div className='burger-button'>
            <Dropdown item text='' icon='bars'>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => history.push('/dashboard')}>Liste des réparations</Dropdown.Item>
                    <Dropdown.Item onClick={() => history.push('/RepairSheetForm')}>Créer une fiche de réparation</Dropdown.Item>
                    <Dropdown.Item onClick={()=> history.push('/ClientList')}>Liste des clients</Dropdown.Item>
                    <Dropdown.Item onClick={()=> history.push('/clientForm')}>Créer une fiche client</Dropdown.Item>
                    <Dropdown.Item onClick={()=> history.push('/archives')}>Liste des archives</Dropdown.Item>
                    <Dropdown.Item onClick={()=> history.push('/workerForm')}>Créer une fiche employé</Dropdown.Item>
                    <Dropdown.Item onClick={()=> history.push('/workerList')}>Liste des employés</Dropdown.Item>
                    <Dropdown.Item onClick={()=> history.push('/PanneForm')}>Créer un modèle de panne</Dropdown.Item>
                    <Dropdown.Item onClick={()=> history.push('/PanneList')}>Liste des pannes</Dropdown.Item>
                    <Dropdown.Item onClick={()=> history.push('/TagForm')}>Créer un tag</Dropdown.Item>
                    <Dropdown.Item onClick={()=> history.push('/TagList')}>Liste des tags</Dropdown.Item>
                    <Dropdown.Item onClick={()=> history.push('/actionForm')}>Créer une action</Dropdown.Item>
                    <Dropdown.Item onClick={()=> history.push('/actions')}>Liste des action</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
};

export default BurgerButtonAdmin;