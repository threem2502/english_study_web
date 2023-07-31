import { styled } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled.div`
    margin: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center; 
    background-color: #d2d2d2; 
`

export const FormWrapper = styled.div`
    width: 70%;
    height: 70%;
    display: flex;
    flex-direction: row; 
    background: white;
    justify-content: center;
    align-items: center;
`

export const LeftForm = styled.div`
    width: 50%;
    height: 100%;
    margin: 0;
    padding: 24px;
    background-color: white; 
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

export const RightForm = styled.div`
    width: 50%;
    height: 100%;
    margin: 0;
    background: linear-gradient(135deg, #f75959 0%, #f35587 100%);
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
`

export const TopLeftForm = styled.div`
    display: flex;
    height: 15%;
    width: 100%
`

export const Title = styled.h3`
    font-weight: 300;
    display: inline-block;
    width: 50%;
    font-size: 35px;
    height: 100%;
    margin: 0;
    color: #524a4a;
`

export const SocialWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
    width: 50%;
    margin: 0;
`
export const Icon = styled(FontAwesomeIcon)`
    height: 15px;
    width: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 30px;
    margin-left: 10px;
    color: gray;
    transition: background 0.5s ease-in-out;
    &:hover {
        background: linear-gradient(135deg, #f75959 0%, #f35587 100%);
        color: white;
    }
    cursor: pointer;
`;

export const Text = styled.p`
    font-weight: ${props => props.fontWeight};
    font-size: ${props => props.fontSize};  
    color: ${props => props.color};
    margin: ${props => props.margin};
    display: ${props => props.display};
`;

export const Input = styled.input `
    height: 48px;
    width: calc(100% - 42px);
    margin: 0;
    background: rgba(0, 0, 0, 0.05);
    color: #000;
    font-size: 16px;
    border-radius: 50px;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid transparent;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
    outline: none;
    transition: transform 0.3s ease-in-out;
    &:hover{
        transform: scale(1.05);
    }
`
export const ButtonSignIn = styled.div`
    border: 1px solid #f35588;
    color: #fff;
    background: linear-gradient(135deg, #f75959 0%, #f35587 100%);
    font-size: 16px;
    text-align: center;
    vertical-align: middle;
    border-radius: 50px;
    padding: 13.5px;
    cursor: pointer;
    margin-bottom: 15px; 
    transition: transform 0.3s ease-in-out;
    &:hover{
        transform: scale(1.05);
    }
`

export const ButtonSignUp = styled.div`
    cursor: pointer;
    border: 1px solid #fff;
    background: transparent;
    color: #fff;
    font-size: 15px;
    padding: 10px 20px;
    border-radius: 50px;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    transition: transform 0.3s ease-in-out;
    margin-top: 10px;
    &:hover{
        background: white;
        color: black;
        transform: translateY(-5px);
    }
`