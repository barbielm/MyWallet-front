import styled from 'styled-components';
import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import UserContext from './contexts/UserContext';
import { useHistory } from 'react-router-dom';
import Joi from 'joi';

export default function AddExtract(){
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const {userInformation, isDeposit, setUserInformation} = useContext(UserContext);
    const history = useHistory();
    const localUser = JSON.parse(localStorage.getItem("userInformation"));


    const schema = Joi.object({
        value: Joi.number().min(0.01).precision(2).required(),
        description: Joi.string().required()
    })

    useEffect(() => {
        if(!userInformation){
            setUserInformation(localUser)
        }
    },[])
    
    function addExtract(e){
        e.preventDefault();
        const config = {
            headers: {
                "Authorization": "Bearer " + userInformation.token
            }
        }

        const { error } = schema.validate({value, description});
        if(!!error){
            alert("Preencha a descrição e digite o valor em reais com duas casas decimais separando por ponto");
            return;
        }
        console.log(value)
        const cents = parseInt(value*100);
        console.log(cents);
        const now = new Date();
        const date = now.toLocaleDateString();
        const request = axios.post(`http://localhost:4000/add-extract`,{cents, description, date, isDeposit}, config)
        request.then(reply => {
            alert("Extract created with success :)");
            history.push('/extracts');
        })
        request.catch(() => {
            alert("Was not possible to create extract");
        })

        
    }
    
    return(
        <Content>
            <Header>
                {(isDeposit) ? 'Nova Entrada' : 'Nova Saída'}
                <IconContext.Provider value={{className: "back-icon"}}>
                    <IoArrowBackCircleOutline onClick={() => history.push('/extracts')} />
                </IconContext.Provider>
            </Header>
            
            <form onSubmit={(e) => addExtract(e)}>
                <input type="text" placeholder="Valor" required value={value} onChange={e => setValue(e.target.value)} />
                <input type="text" placeholder="Descrição" required value={description} onChange={e => setDescription(e.target.value)} />
                <button >{(isDeposit) ? 'Salvar Entrada' : 'Salvar Saída'}</button>
            </form>
        </Content>
        
    )
}

const Content = styled.div`
    font-family: 'Raleway', sans-serif;
    padding: 15px 25px;
    width: 100%;
    height: 100vh;
    form{
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    input{
        width: 100%;
        height: 58px;
        margin-bottom: 13px;
        background: #FFFFFF;
        border-radius: 5px;
        border: none;
        font-family: Raleway;
        font-size: 20px;
        color: #000000;
        padding: 0 15px;
    }
    input::placeholder{
        color: #c2c2c2;
        font-size: 20px;
    }
    button{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 46px;
        background: #A328D6;
        border-radius: 5px;
        border: none;
        font-weight: bold;
        font-size: 20px;
        color: #FFFFFF;
    }
`

const Header = styled.div`
    font-weight: bold;
    font-size: 26px;
    color: #FFFFFF;
    position: relative;
    .back-icon{
        position: absolute;
        top: 0;
        right: 0;
    }
 
`