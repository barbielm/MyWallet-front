import styled from 'styled-components';
import {useState} from 'react';

export default function AddDeposit(){
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    
    function addDeposit(e){
        e.preventDefault();
    }
    
    return(
        <Content>
            <Header>
                Nova Entrada
            </Header>
            
            <form onSubmit={(e) => addDeposit(e)}>
                <input type="email" placeholder="Valor" required value={value} onChange={e => setValue(e.target.value)} />
                <input type="password" placeholder="Descrição" required value={description} onChange={e => setDescription(e.target.value)} />
                <button >Salvar Entrada</button>
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
        color: #000000;
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