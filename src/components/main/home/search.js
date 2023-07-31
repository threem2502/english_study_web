import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { useState } from "react";
import { AddPopUp } from "./popup";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, onSnapshot } from "firebase/firestore"; 
import { auth } from "../../../firebase";


const SearchBarWrapper = styled.div`
    margin: 0px;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    border-bottom:  1px solid gray;
    padding-bottom: 1px;
`
const Input = styled.input`
    border: none;
    outline: none;
    font-size: 15px; 
    padding: 5px 15px;
  
`
const IconSearch = styled(FontAwesomeIcon)`
    color: gray;
    font-size: 20px;
    position: relative;
    left: -25px;
    cursor: pointer;
`
const AddButton = styled.button`
    background: linear-gradient(135deg, #f75959 0%, #f35587 100%);
    color: white;
    font-weight: 600;
    border: 1px solid white;
    border-radius: 5px; 
    height: 100%;
    transition: background 0.3s ease-in-out;
    cursor: pointer;
    &:hover{
        background: linear-gradient(45deg, #dc1818 0%, #b21e4d 100%);
    }
`

const SearchBar = (props) => {
    const [showAddPopUp, setShowAddPopUp] = useState(false);
    
    const handleAddButtonClicked = () => {
            setShowAddPopUp(true);
    };

    const handleClosePopUp = () => {
        setShowAddPopUp(false);
    };

    const handleSavePopUp = () => {
        setShowAddPopUp(false);
    };
    return(
        <SearchBarWrapper>
            <Input onChange={props.onSearch}
            placeholder="Tìm kiếm"
            />
            <IconSearch 
                icon={faMagnifyingGlass}
                />
            <AddButton onClick={handleAddButtonClicked}>Thêm từ mới</AddButton>
            <AddPopUp
            showAddPopUp={showAddPopUp}
            onClose={handleClosePopUp}
            onSave={handleSavePopUp}
            />
        </SearchBarWrapper>
    )
}

export default SearchBar