import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react';


const AdminMenu = () => {
    const history = useHistory();

    return (
        <div className='dashboard-menu'>
            <Menu vertical>
                <Dropdown item text='Réparations'>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => history.push('/RepairSheetForm')}>Créer une fiche réparation</Dropdown.Item>
                        <Dropdown.Item onClick={() => history.push('/dashboardAdmin')}>Liste des réparations</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown item text='Clients'>
                    <Dropdown.Menu>
                        <Dropdown.Item>Créer une fiche client</Dropdown.Item>
                        <Dropdown.Item>Liste des clients</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown item text='Archives'>
                    <Dropdown.Menu>
                        <Dropdown.Item>Liste des archives</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown item text='Employés'>
                    <Dropdown.Menu>
                        <Dropdown.Item>Créer une fiche employé</Dropdown.Item>
                        <Dropdown.Item>Liste des employés</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown item text='Tags'>
                    <Dropdown.Menu>
                        <Dropdown.Item>Créer un tag</Dropdown.Item>
                        <Dropdown.Item>Liste des tags</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown item text='Actions'>
                    <Dropdown.Menu>
                        <Dropdown.Item>Créer une action</Dropdown.Item>
                        <Dropdown.Item>Liste des actions</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown item text='Pannes'>
                    <Dropdown.Menu>
                        <Dropdown.Item>Créer un modèle de panne</Dropdown.Item>
                        <Dropdown.Item>Liste des modèles de pannes</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        </div>
    )
};
export default AdminMenu;