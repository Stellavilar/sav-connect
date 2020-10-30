import React, { useState, useEffect} from 'react';
import { Header, Confirm } from 'semantic-ui-react';
import { useParams } from 'react-router';
import axios from 'axios';


const StepFiveForm = () => {

    const [ firstTag, setFirstTag ] = useState('');
    const [ secondTag, setSecondTag ] = useState('');
    const [ thirdTag, setThirdTag ] = useState('');
    
    /**Get repairSheet id */
    const [ getId, setGetId ] = useState('');
    let {order_number} = useParams();
    const findOrderNumber = () => {
    axios.get(`repairSheet/stepFour/${order_number}`)
        .then((res)=> {
            setGetId(res.data[0].id);
        })
        .catch((err)=> {
            console.log(err);
        })
        return findOrderNumber;
    };
    findOrderNumber();

    /**Get tags */
    const clientData = () => {
        axios.get(`repairSheet/stepOne/${order_number}`)
            .then((res)=> {
                axios.get(`repairSheet/tag/${res.data[0].id}`)
                .then((res1)=> {
                    setFirstTag(res1.data[0]);
                    setSecondTag(res1.data[1]);
                    setThirdTag(res1.data[2]);
                })      
            })
            .catch((err)=> {
                console.log(err);
            })
            return clientData;
    };

    /**Add tag on repair sheet */
    const [ confirmMessage, setConfirmMessage ] = useState(null);
    const onDoubleClick = (e) => {
        e.target.style.boxShadow = '10px 10px 5px 0px #656565';
        const repairId = getId;
        const tagId = e.target.id;
        axios.get(`tag/${tagId}/sav/${repairId}` , {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((res) => {
                console.log(res);
                setConfirmMessage(' *Tag ajouté');
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            })
    };
           
    /**Show all tags */
    const [ tagData, setTagData ] = useState([]);
    const Tags = () => {
        axios.get('tags')
            .then((res) => {
                setTagData(res.data);
            })
            .catch((err)=> {
                console.log(err);
            })
            return Tags;
    };
    /**Modal confirm to delete tag */
    const [ getOpen, setGetOpen ] = useState(false);
    const [ getTagId, setGetTagId ] = useState('');

    const onClickRemove= (e) => {
        setGetTagId(e.target.id);
        setGetOpen(true);
    };

    const handleCancel = () => { setGetOpen(false) };
    const handleConfirm = () => {
        axios.get(`repairSheet/stepOne/${order_number}`)
            .then((res) => {
                axios.get(`remove/${getTagId}/sav/${res.data[0].id}` , {
                    withCredentials: true,
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then((res1) => {
                    console.log(res1);
                    window.location.reload(false);
                })
            })
        .catch((err) => {
            console.log(err);
        })
        setGetOpen(false)
    };

    const getTags = tagData.map((tag)=> 
        <div className='tag' key={tag.id} style={{backgroundColor: `${tag.color}` }} id={tag.id} onDoubleClick={onDoubleClick} >{tag.title}<div onClick={onClickRemove}  ><i className="far fa-times-circle" id={tag.id}></i></div></div>
    );

    useEffect(Tags, []);
    useEffect(clientData, []);
    
    return (
        <div className='tab-form'>
            <Header as='h2'>Tags</Header>
            <Header as='h3'>Pour ajouter un tag, double-cliquez dessus !</Header>
            <div className='tag-list'>
                <div className='tags'>{getTags}</div>
                {confirmMessage && <p>{confirmMessage}</p>}
            </div>
            <Header as='h3' className='tags-repair'>Tags reliés à la fiche :</Header>
            <div className='tag-area'>
                { firstTag ? <div className='tags-on-form' style={{backgroundColor: `${firstTag.color}` }}>{firstTag.title}</div> : null }
                { secondTag ? <div className='tags-on-form' style={{backgroundColor: `${secondTag.color}` }}>{secondTag.title}</div> : null}  
                { thirdTag ? <div className='tags-on-form' style={{backgroundColor: `${thirdTag.color}` }}>{thirdTag.title}</div> : null}
            </div>
            <Confirm 
                    open={getOpen}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    content=' Êtes-vous sûr de vouloir supprimer ce tag?'
                    cancelButton='Annuler'
                    confirmButton='OK'
                />
        </div>
    );
};

export default StepFiveForm;