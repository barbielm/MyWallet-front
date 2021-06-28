import styled from 'styled-components';
export default function Extract({extract}){
    const {date, description, value, isDeposit} = extract;
    const minDate = date[8] + date[9] + '/' + date[5] + date[6];
    return(
        <Content>
            <li className="extract">
                <Informations>
                    <Date>{minDate}</Date>
                    <Description>{description}</Description>
                </Informations>
                
                <Value isDeposit={isDeposit}>{value/100}</Value>
            </li>
        </Content>
        
    )
}

const Content = styled.div`
    .extract{
        font-family: 'Raleway', sans-serif;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px; 
    }
`
const Informations = styled.div`
    display: flex;
`
const Date = styled.div`
    color: #C6C6C6;
    margin-right: 15px;
`
const Description = styled.div`
    color: #000000;
`
const Value = styled.div`
    color: ${props => (props.isDeposit) ? '#03AC00' : '#C70000'};

`