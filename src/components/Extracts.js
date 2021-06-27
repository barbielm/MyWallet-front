import { useState } from 'react';
import styled from 'styled-components';
import { IoIosLogOut, IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import { IconContext } from "react-icons";
import { useHistory } from 'react-router-dom';

export default function Extracts(){
    const [name, setName] = useState('Fulano');
    const history = useHistory();

    return(
        <Content>
            <Header>
                <UserName>Olá, {name}</UserName>
                <IconContext.Provider value={{className: "logout-icon"}}>
                    <IoIosLogOut onClick={() => history.push('/')} />
                </IconContext.Provider>
            </Header>
            <ul className="extracts-list">
                <DefaultMessage>Não há registros de entrada ou saída</DefaultMessage>    
                <li className="extract"></li>
            </ul>
            <Menu>
                <Deposit onClick={() => history.push('/add-deposit')}>
                    <IconContext.Provider value={{className: "extract-icon"}}>
                        <IoIosAddCircleOutline />
                    </IconContext.Provider>
                    <Names>
                        <Name>Nova</Name>
                        <Name>Entrada</Name>
                    </Names>
                </Deposit>
                <Withdraw onClick={() => history.push('/add-withdraw')}>
                    <IconContext.Provider value={{className: "extract-icon"}}>
                        <IoIosRemoveCircleOutline />
                    </IconContext.Provider>
                    <Names>
                        <Name>Nova</Name>
                        <Name>Saída</Name>
                    </Names>
                </Withdraw>
            </Menu>
        </Content>
    )
}

const Content = styled.div`
    font-family: 'Raleway', sans-serif;
    padding: 15px 25px;
    width: 100%;
    height: 100vh;
    .extracts-list{
        background: #ffffff;
        border-radius: 5px;
        width: 100%;
        height: 68%;
        margin: 20px 0 15px 0;
        position: relative;
    }
`

const DefaultMessage = styled.div`
    font-size: 20px;
    text-align: center;
    color: #868686;
    width: 70%;
    position: absolute;
    top: calc(50% - 20px);
    left: 15%;
`

const Header = styled.div`
    font-weight: bold;
    font-size: 26px;
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    .logout-icon{
        font-size: 24px;
        color: #FFFFFF;
    }

`
const UserName = styled.div`
`
const Name = styled.div``
const Names = styled.div`
    display: flex;
    flex-direction: column;
`
const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: #ffffff;
    font-size: 17px;
    font-weight: bold;
    .extract-icon{
        font-size: 22px;
        color: #ffffff;
    }
`
const Withdraw = styled.div`
    width: 48%;
    height: 115px;
    background: #A328D6;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
`
const Deposit = styled.div`
    width: 48%;
    height: 115px;
    background: #A328D6;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
`