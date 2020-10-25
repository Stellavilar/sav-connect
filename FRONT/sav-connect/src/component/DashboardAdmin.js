import React from 'react';
import { Grid, Segment } from 'semantic-ui-react'


const DashboardAdmin = ({repair}) => {
    //Map repairs sheet
    const test = () => {console.log('cliqué')}
    const repairsSheet = repair.map((rep) =>
        <Grid.Row className='grid-details' key={rep.id} onClick={test}>
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
                    <span style={{backgroundColor : rep.tags[0].color}}>{rep.tags[0].title}</span>
            </Grid.Column>
            <Grid.Column>
            <i className="far fa-eye"></i>
            <i className="fas fa-pencil-alt"></i>
            <i className="far fa-trash-alt"></i>
            </Grid.Column>
        </Grid.Row>
    )
    return (
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
    );
};

export default DashboardAdmin;