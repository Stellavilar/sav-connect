import React, { useState, useEffect } from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { TwitterPicker } from 'react-color';

import axios from 'axios';

const Taglist = () => {

    const ShowDiv = () => {
        /**React color state */
        const [color, setColor] = useState();
        const [ getTitle, setGetTitle ] = useState('');
    
        /**Handle click on cancel button*/
        const handleClick = () => {
            window.location.reload(false);
        };
        /**Edit tag */
        const handleSubmit = (e) => {
            e.preventDefault();
            const tagId = getId;
            axios.patch(`tag/edit/${tagId}`, {title: getTitle, color: color })
                .then((res)=>{
                    console.log(res)
                    window.location.reload(false);
                })
                .catch((err)=> {
                    console.log(err)
                })
        };
           
        return (
            <div className='tag-form'>
                        <Header as='h2'>Modifier le Tag</Header>
                        <Form
                            onSubmit={handleSubmit}
                        >
                            <Form.Field>
                                <label>Intitulé du tag</label>
                                <input
                                    type='text'
                                    name='title'
                                    onChange={(e)=> setGetTitle(e.target.value)}
                                    />
                            </Form.Field>
    
                            <Form.Field>
                                <label>Couleur</label>
                            </Form.Field>
                            <TwitterPicker
                                name='color'
                                color={color}
                                onChangeComplete={(color) => setColor(color.hex)}
                                />
                            <div className='buttons'>
                                <Button color='teal'>Valider</Button>
                                <Button color='red' onClick={handleClick}>Annuler</Button>
                                {/* { errorMessage && <p className='error-message'>{errorMessage}</p> } */}
                            </div>
                        </Form>
                    </div>
        );
    };
    

    /**Display div to show form edit */
    const [ showResults, setShowResults ] = useState(false);

    const [ getId, setGetId ] = useState('');

    const onClick = (e) => {
        e.target.style.border = 'solid red 2px';
        setShowResults(true);

        /**Get tag id */
        setGetId(e.target.id);
        
    };

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
    const getTags = tagData.map((tag)=> 
        <div className='tag' key={tag.id} style={{backgroundColor: `${tag.color}` }} onDoubleClick={onClick} id={tag.id} >{tag.title}</div>);
    

    useEffect(Tags, []);

    return (
        <div className='tag-list'>
            <Segment>
                <Header as='h2'>Liste des Tags</Header>
                <p>Pour modifier un tag, double cliquez dessus!</p>
                <div className='tags'>{getTags}</div>
                { showResults ? <ShowDiv /> : null}
            </Segment>
        </div>
    )
};


export default Taglist;