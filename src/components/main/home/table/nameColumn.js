import { faCircleMinus, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

const ColumnNameWrapper = styled.div`
    width: 80%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    padding-left: 10%;
    
`
const TextName = styled.p`
    font-size: 20px;
    font-weight: 500;
    width: 20%;
`


const NameColumn = () => {
    return (
        <ColumnNameWrapper>
            <TextName>Từ</TextName>
            <TextName>Phiên âm</TextName>
            <TextName>Nghĩa</TextName>
            <TextName>Ngày học</TextName>
        </ColumnNameWrapper>
    )
}

export default NameColumn