import styled from 'styled-components';
import {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from './contexts/UserContext';
import { useHistory } from 'react-router-dom';
import Joi, { number } from 'joi';

export default function AddWithdraw(){
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const {userInformation} = useContext(UserContext);
    const history = useHistory();

    const schema = Joi.object({
        value: Joi.number().integer().min(1).required(),
        description: Joi.string().required()
    })

    function addWithdraw(e){
        e.preventDefault();
        const { error } = schema.validate({value, description});
        if(!!error){
            alert("Preencha a descrição e digite o valor em centavos");
            return;
        }
        const config = {
            headers: {
                "Authorization": "Bearer " + userInformation.token
            }
        }

        const now = new Date();
        const date = now.toLocaleDateString();
        
        const request = axios.post("http://localhost:4000/add-withdraw",{value, description, date, isDeposit: false}, config)
        request.then(reply => {
            alert("Withdraw created with success :)");
            history.push('/extracts');
        })
        request.catch(() => {
            alert("Was not possible to create withdraw");
        })
    }
    
    return(
        <Content>
            <Header>
                Nova Saída
            </Header>
            <form onSubmit={(e) => addWithdraw(e)}>
                <input type="text" placeholder="Valor" required value={value} onChange={e => setValue(e.target.value)} />
                <input type="text" placeholder="Descrição" required value={description} onChange={e => setDescription(e.target.value)} />
                <button >Salvar saída</button>
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
        margin-top:  20px;
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
 
`