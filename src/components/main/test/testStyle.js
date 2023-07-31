import { styled } from "styled-components";
import css from "styled-components";

export const Wrapper = styled.div`
    margin: 0;
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: center; 
    flex-direction: column;
    align-items: center;
`

export const Top = styled.div`
    height: 10%;
    width: 100%;
    margin: 0;
`
export const Text = styled.p`
    color: ${props => props.color};
    width: 45%;
    display: inline-block;
    position: relative;
    left: 4%;
`
export const EndButton = styled.button `
    border: none;
    border-radius: 5px;
    font-size: 16px;
    height: 100%;
    width: 10%;
    color: white;
    background: linear-gradient(#005C97 0%, #363795 100%);
    transition: background 0.15s ease-in-out;
    transition: transform 0.15s ease-in-out;
    cursor: pointer;
    &:hover{
        background: #005C97;
        transform: scale(1.05);
    }
`



export const Question = styled.h1`
    font-size: 50px;
    margin-top: 0;
`
export const AnswerWrapper = styled.div`
    width: 80%;
    height: 60%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-end;
`

export const Answer = styled.button`
    width: 40%;
    height: 40%;
    font-size: 24px;
    background: linear-gradient(#00b09b 0%, #3a7bd5 100%);
    color: white;
    border: none;
    border-radius: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out;
    &:hover{
        transform: scale(1.05);
        background: #141E30;  
    }
    ${(props) =>
    props.isCorrect &&
    css`
      background: green;
    `}

    ${(props) =>
    props.isIncorrect &&
    css`
      background: red;
    `}
`