import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { IoIosLogOut, IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import { IconContext } from "react-icons";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UserContext from './contexts/UserContext';
import Extract from './Extract';

export default function Extracts(){
    const {userInformation, setUserInformation, setIsDeposit} = useContext(UserContext);
    const [name, setName] = useState('');
    const history = useHistory();
    const [extractsList, setExtracts ] = useState([]);
    const [loading, setLoading] = useState(false);
    const localUser = JSON.parse(localStorage.getItem("userInformation"));
    const {token} = localUser;
    

    function getExtracts(){
        setLoading(true);
        const config = {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        
        const request = axios.get("http://localhost:4000/extracts",config)
        request.then(reply => {
            setLoading(false);
            setExtracts(reply.data);
            console.log(reply.data);
            
        })
        request.catch(() => {
            alert("Was not possible to get extracts");
        }) 
    }

    function getBalance(){
        let balance = 0;
        for(let i = 0; i < extractsList.length; i++){
            const element =  extractsList[i];
            if(element.isDeposit) balance += element.value;
            else balance -= element.value;
        }
        return balance/100;
        
    }

    function logout(){
        const config = {
            headers: {
                "Authorization": "Bearer " + userInformation.token
            }
        }
        
        const request = axios.post("http://localhost:4000/logout",{},config)
        request.then(reply => {
            setUserInformation(null);
            localStorage.removeItem("userInformation");
            history.push('/');
        })
        request.catch(() => {
            alert("Was not possible to logout");
        })
    }

    useEffect(() => {
        if(!userInformation){
            setUserInformation(localUser)
        }
        setName(localUser.name);
        getExtracts();
    },[])

    return(
        <Content>
            <Header>
                <UserName>Olá, {name}</UserName>
                <IconContext.Provider value={{className: "logout-icon"}}>
                    <IoIosLogOut onClick={logout} />
                </IconContext.Provider>
            </Header>
            <ul className="extracts-list">
                <List>
                    {(extractsList.length === 0 || loading) ? <DefaultMessage>Não há registros de entrada ou saída</DefaultMessage> 
                    : extractsList.map((e,i) => <Extract extract={e} key={i} />)
                    }
                </List>
                    {(extractsList.length === 0 || loading) ? '' 
                    : 
                    <Balance>
                        <Title>SALDO</Title>
                        <Value getBalance={getBalance}>{getBalance().toFixed(2).replace('.',',')}</Value>
                    </Balance>}
            </ul>
            <Menu>
                <Deposit onClick={() => 
                    {history.push('/add-deposit');
                    setIsDeposit(true);
                    }}>
                    <IconContext.Provider value={{className: "extract-icon"}}>
                        <IoIosAddCircleOutline />
                    </IconContext.Provider>
                    <Names>
                        <Name>Nova</Name>
                        <Name>Entrada</Name>
                    </Names>
                </Deposit>
                <Withdraw onClick={() => 
                    {history.push('/add-withdraw');
                    setIsDeposit(false);
                    }}>
                    
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
        height: 70%;
        margin: 20px 0 15px 0;
        position: relative;
        padding: 20px 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: scroll;
    }
    
`
const List = styled.div`

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
        font-size: 27px;
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
        font-size: 25px;
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
const Balance = styled.div`
    font-size: 22px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
`
const Value = styled.div`
 color: ${props => (props.getBalance() > 0) ? '#03AC00' : '#C70000'} ;
 font-weight: normal ;
`

const Title = styled.div`
    color: #000000;
`