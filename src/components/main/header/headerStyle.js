import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

export const Wrapper = styled.div`
    margin: 0;
    width: calc(100vw - 60px);
    height: 7%;
    padding: 15px 30px;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center; 
    background: #fff;
`

const LogoIcon = styled(FontAwesomeIcon)`
    font-size: 50px; 
    color: #f35588;
    filter: drop-shadow(2px 2px 1px gray);
`
const LogoWraper = styled.div`
    width: 265px;
    text-align: center;
    display: flex;
    align-items: center;
    cursor: pointer;
    
`

export const Logo = () => {
    return (
        <LogoWraper>
            <LogoIcon icon={faGraduationCap}/>
            <h2 style={{
                display: 'inline-block',
                padding: '0',
                fontSize: '30px',
                color: '#f75959',
                marginLeft: '10px',
                filter: 'drop-shadow(1px 1px 1px gray)'
            }}>English Study</h2>
        </LogoWraper>
    )
}

export const NavContainer = styled.div`
    display: flex;
    height: 75%;
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end; 
    margin-right: 5%;
`

export const NavItem = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 3%;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
        background-color: #e5e7eb;
    }
`
export const Icon = styled(FontAwesomeIcon)`
    color: ${props => props.color};
    font-size: ${props => props.fontSize};
    margin: ${props => props.margin};
    font-weight: ${props => props.fontWeight};
`

export const Text = styled.p`
    color: ${props => props.color};
    font-size: ${props => props.fontSize};
    margin: ${props => props.margin};
    font-weight: ${props => props.fontWeight};
`