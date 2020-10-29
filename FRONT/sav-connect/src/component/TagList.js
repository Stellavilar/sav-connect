import React, { useState, useEffect } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import axios from 'axios';

const Taglist = () => {

    const [ tagData, setTagData ] = useState([]);
    const Tags = () => {
        axios.get('tags')
            .then((res) => {
                setTagData(res.data)
            })
            .catch((err)=> {
                console.log(err)
            })
            return Tags;
    };
    const getTags = tagData.map((tag)=> <div className='tag' key={tag.id} style={{backgroundColor: `${tag.color}`}}>{tag.title}</div>);
    

    useEffect(Tags, []);

    return (
        <div className='tag-list'>
            <Segment>
                <Header as='h2'>Liste des Tags</Header>
                <p>Pour modifier un tag, double cliquez dessus!</p>
                <div className='tags'>{getTags}</div>
                
            </Segment>
        </div>
    )
};

export default Taglist;