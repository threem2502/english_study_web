import { styled } from "styled-components";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, query, serverTimestamp, where } from "firebase/firestore";
import { doc, setDoc, onSnapshot, updateDoc,addDoc, collection } from "firebase/firestore"; 
import { auth,db } from "../../../firebase";

const PopUpWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items:  center;
    justify-content: space-evenly;
`
const InputWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin: 0;
    margin-bottom: 10px;
    padding-left: 10px; 
`
const Text = styled.p`
    font-weight: 600;
    display: inline-block;
    width: 20%;
    margin: 10px;
`

const Input = styled.input`
    outline: none;
    border: 1px solid gray;
    width: 70%;
    font-size: 15px;
    border-radius: 15px;
    transition: transform 0.3s ease-in-out;
    &:hover{
        background: rgb(210, 210, 210, 0.5);
        transform: scale(1.05);
        &::placeholder{
            color: black;
        }
    }
`
const Button = styled.button`
    background: ${props => props.background};
    font-size: 20px; 
    height: 100%;
    width: 40%;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    color: white;
    font-weight: 600;
    &:hover{
        transform: scale(1.1);
        background: linear-gradient(#333333 0%,#dd1818 100%);
    }
`

  
const PopUpContent = (props) => {
    const [word, setWord] = useState(props.word || '');
    const [spell, setSpell] = useState(props.spell || '');
    const [mean, setMean] = useState(props.mean || '');
    const [type, setType] = useState(props.type || '');
    const [userData, setUserData] = useState(null);
    const [userDataLoaded, setUserDataLoaded] = useState(false);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserData(user.uid);
          setUserDataLoaded(true);
        } else {
          setUserData(null);
          setUserDataLoaded(false);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'word') {
            setWord(value);
        } else if (name === 'spell') {
            setSpell(value);
        } else if (name === 'mean') {
            setMean(value);
        } else if (name === 'type') {
            setType(value);
        }
    };
    
    const [error, setError] = useState('')
    const handleButtonSaveClick = async (option) => {
        if (option === 'Thêm từ') {
            if (word === '' || spell === '' || mean === '' || type === '') {
                setError('Không được để trống')
            } else {
                const newData = {
                    word: word,
                    spell: spell,
                    mean: mean,
                    type: type,
                    date: serverTimestamp()
                }
                    
                if (userDataLoaded && userData) {
                    const vocabCollectionRef = collection(db, "users", userData, "vocab");
                    const querySnapshot = await getDocs(
                            query(vocabCollectionRef, where("word", "==", newData.word))
                    );
                    
                    if (querySnapshot.empty) {
                        await addDoc(vocabCollectionRef, newData);
                        setError('');
                        props.onSave();
                    } else {
                        setError('Từ này đã được học');
                    }
                }
            }
        } else if (option === 'Sửa từ' && props.selectedItem) {
            if (word === '' || spell === '' || mean === '' || type === '') {
                setError('Không được để trống');
            } else {
                const updatedData = {
                    word: word,
                    spell: spell,
                    mean: mean,
                    type: type,
                    date: serverTimestamp()
                };
                console.log(props.selectedItem.id);
                
                if (userDataLoaded && userData) {
                    const vocabCollectionRef = collection(db, "users", userData, "vocab");
        
                    try {
                        await updateDoc(doc(vocabCollectionRef, props.selectedItem.id), updatedData);
                        setError('');
                        props.onClose();
                    } catch (error) {
                        setError('Đã xảy ra lỗi khi cập nhật từ')
                        console.log(error.message);
                }
              }
            }
        }
    }
    return (
        <PopUpWrapper>
            <Text style={{
                fontSize:'24px',
                fontWeight: 'bold',
                textAlign:'center',
            }}>{props.option}</Text>
            <InputWrapper>
            <Text>Từ</Text>
            <Input  value={word} 
                    placeholder="Nhập từ" 
                    onChange={handleInputChange}
                    name="word"></Input>
            
            </InputWrapper>
            <InputWrapper>
            <Text>Phiên âm</Text>
            <Input  value={spell} 
                    placeholder="Nhập phiên âm" 
                    onChange={handleInputChange}
                    name="spell"></Input>
            
            </InputWrapper>
            <InputWrapper>
            <Text>Nghĩa</Text>
            <Input  value={mean} 
                    placeholder="Nhập nghĩa" 
                    onChange={handleInputChange}
                    name="mean"></Input>
            </InputWrapper>
            <InputWrapper>
            <Text>Từ loại</Text>
            <Input  value={type} 
                    placeholder="Nhập từ loại" 
                    onChange={handleInputChange}
                    name="type"></Input>
            </InputWrapper>
            <Text style={{
                color: 'red',
                width: '100%',
                textAlign: 'center',
                margin: '2px',
                fontSize: '14px'
            }}>{error}</Text>
            <div style={{
                height: '10%',
                marginTop: '10px',
                width: '80%',
                display: 'flex',
                justifyContent:'space-evenly'
            }}>
                <Button 
                    background={'linear-gradient(#f12711 0%,#f5af19 100%)'} 
                    onClick={() => handleButtonSaveClick(props.option)}
                    >Lưu</Button>
                <Button 
                    background={'linear-gradient(#141E30 0%,#243B55 100%)'}
                    onClick={props.onClose}>Huỷ</Button>
            </div>
            
        </PopUpWrapper>
    )
}
export const PointPopUp = (props) => {
    return(
        <Popup 
        open={props.showPointPopUp}
        onClose={props.onClose}
        lockScroll
        contentStyle={{
            width: "40vw",
            height: "30vh",
            textAlign: 'center',
        }}
        position="center center">
            <h1>Bạn đúng {props.point.count} trong {props.point.total} câu hỏi</h1>
            <Button style={{
                width: '100px',
                height: '40px',
                marginTop: '20px'
            }} background={'linear-gradient(#f12711 0%,#f5af19 100%)'} onClick={props.onClose}>OK</Button>
        </Popup>
    )
}

export const AddPopUp = (props) => {
    return (
        <Popup 
            open={props.showAddPopUp}
            onClose={props.onClose}
            lockScroll
            contentStyle={{
                width: "40vw",
                height: "53vh",
            }}
            position="center center">
            <PopUpContent {...props}
                option='Thêm từ'
            />
            </Popup>
    )
}

export const EditPopUp = (props) => {
    return (
        <Popup 
            open={props.showEditPopUp}
            onClose={props.onClose}
            lockScroll
            contentStyle={{
                width: "40vw",
                height: "53vh",
            }}
            position="center center">
            <PopUpContent
                {...props}
                word={props.word}
                spell={props.spell}
                mean={props.mean}
                type={props.type}
                option='Sửa từ'
            />
            </Popup>
    )
}

export const DelPopUp = (props) => {
    return (
        <Popup
            open={props.showDelPopUp}
            onClose={props.onClose}
            lockScroll
            contentStyle={{
                width: "40vw",
                height: "20vh",
            }}
            position="center center">
        <PopUpWrapper>
            <h2>Bạn có muốn xoá từ không?</h2>
            <div style={{
                height: '20%',
                marginTop: '10px',
                width: '80%',
                display: 'flex',
                justifyContent:'space-evenly'
            }}>
                <Button 
                    background={'linear-gradient(#f12711 0%,#f5af19 100%)'} 
                    onClick={props.onButtonDelClick}
                    >Xoá</Button>
                <Button 
                    background={'linear-gradient(#141E30 0%,#243B55 100%)'}
                    onClick={props.onClose}>Huỷ</Button>
            </div>
        </PopUpWrapper>
        </Popup>
    )
}

