import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './contexts/UserContext';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const {setUserInformation} = useContext(UserContext); 

    function signIn(e){
        e.preventDefault();
        const request = axios.post("http://localhost:4000/sign-in",{email, password});
        request.then(reply => {
            setUserInformation(reply.data);
            history.push('/extracts');
        })
        request.catch(() => {
            alert("Password/email incorrect");
        })
        
    }

    return(
        <Content>
            <Title>MyWallet</Title>
            <form onSubmit={(e) => signIn(e)}>
                <input type="email" placeholder="E-mail" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Senha" required value={password} onChange={e => setPassword(e.target.value)} />
                <button >Entrar</button>
            </form>
            <SignUpLink onClick={() => history.push('/sign-up')}>Primeira vez? Cadastre-se!</SignUpLink>
        </Content>
    )
}

const Content = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 25px;
    form{
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

const Title = styled.div`
    width: 100%;
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
`
const SignUpLink = styled.div `
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 36px;
    font-weight: bold;
    font-size: 15px;
    color: #FFFFFF;
    font-family: 'Raleway', sans-serif;
`