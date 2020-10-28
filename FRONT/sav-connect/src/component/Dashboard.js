import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const Dashboard = ({repair}) => {
    const history = useHistory();

    //Map repairs sheet
    const repairsSheet = repair.map((rep) =>
        <Grid.Row className='grid-details' key={rep.id} >
            <Grid.Column>
                <div className='grid-details'>{rep.order_number}</div>
            </Grid.Column>
            <Grid.Column>
                <div className='grid-details'>{rep.customer.lastname} {rep.customer.firstname}</div>
            </Grid.Column>
            <Grid.Column>
                <div className='grid-details'>{rep.device_name}</div>
            </Grid.Column>
            <Grid.Column>
                <div className='grid-details'>{rep.device_brand}</div>
            </Grid.Column>
            <Grid.Column>
                <div className='grid-details'>{new Intl.DateTimeFormat('fr-FR').format(new Date(rep.date_enter))}</div>
            </Grid.Column>
            <Grid.Column>
                { rep.tags[0] ? <span style={{backgroundColor : rep.tags[0].color}}>{rep.tags[0].title}</span> : <span></span>}
            </Grid.Column>
            <Grid.Column>
            <i className="far fa-eye" onClick={()=> history.push(`/RepairSheet/${rep.order_number}`)} ></i>
            <i className="fas fa-pencil-alt" onClick={()=>console.log('cliqué')}></i>
            <i className="far fa-trash-alt"></i>
            </Grid.Column>
        </Grid.Row>
    )
    return (
        <div className='main-page'>
            <div className='dashboard'>
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>N° de billet</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Client</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Appareil</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Modèle</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Entrée en SAV</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Tags</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Options</Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Segment className='grid-details'>
                    <Grid columns={7}>
                        {repairsSheet}
                    </Grid>
                </Segment>
            </div>
        </div>
    );
};

export default Dashboard;