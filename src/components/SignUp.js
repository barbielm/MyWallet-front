import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function SignUp(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirm] = useState('');
    const history = useHistory();


    function checkPasswords(){
        if(password !== confirmPassword) alert("Passwords don't match");
        return password === confirmPassword;
    }

    function signUp(e){
        e.preventDefault();

        if(checkPasswords()){
            const request = axios.post('http://localhost:4000/sign-up',{name,email,password});
            request.then(reply => {
                alert("new user created with success :)");
                history.push('/');
            })
            request.catch(() => {
                alert("This email has already been declared");
            })
        }
    }

    return(
        <Content>
            <Title>MyWallet</Title>
            <form onSubmit={e => signUp(e)}>
                <input type="text" placeholder="Nome" required value={name} onChange={e => setName(e.target.value)} />
                <input type="email" placeholder="E-mail" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Senha" required value={password} onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirme a senha" required value={confirmPassword} onChange={e => setConfirm(e.target.value)} />
                <button  >Cadastrar</button>
            </form>
            <SignUpLink onClick={() => history.push('/')}>Já tem uma conta? Entre agora!</SignUpLink>
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