import { styled } from "styled-components";
import NameColumn from "./nameColumn";
import { faBan, faCircleMinus, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { collection, doc, query, deleteDoc ,onSnapshot  } from 'firebase/firestore';
import { auth, db } from "../../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { DelPopUp, EditPopUp } from "../popup";

const TableWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid black; 
    border-top: none;
    height: 90%;
`
const ContenWrapper = styled.div`
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: auto;
    overflow-x: hidden; 
    align-items: center; 
`
const ContentItem = styled.div`
    width: 80%;
    display: flex;
    border: 1px solid hsla(0,0%,88%,.7);
    height: 70px;
    border-radius: 15px;
    box-shadow: 1px 1px 1px gray;
    cursor: pointer;
    justify-content: flex-start; 
    align-items: center; 
    margin-top: 15px;
    transition: transform 0.3s ease-in-out;
    &:hover{
        transform: scale(1.01);
    }
    padding-left: 10%;
`

const Text = styled.p`
    font-weight: 500;
    width: 20%;
`

const Icon = styled(FontAwesomeIcon)`
    color = ${props => props.color};
    font-size: 20px;
    margin-left: 25px; 
    &:hover{
        transform: scale(1.3);
    }
`
const Table = ({selectedTopic, keyword}) => {
    const [userId, setUserId] = useState(null);
    const [data, setData] = useState([]);
    const [showData, setShowData] = useState([])
    // Get User data
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserId(user.uid);
          } else {
            setUserId(null);
          }
        });
    
        return () => unsubscribe();
    }, []);

    // get Firestore database
    useEffect(() => {
        if (userId) {
            const collectionRef = collection(db, 'users', userId, 'vocab');
            const q = query(collectionRef);
        
            const unsubscribe = onSnapshot(q, (snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                id: doc.id, 
                ...doc.data() 
            }));
            setData(documents);
            setShowData(documents);
          });
    
          return () => unsubscribe();
        }
    }, [userId]);

    //Del
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedItemId(id);
    };

    const handleButtonDelConfirm = async () => {
        try {
            const documentPath = `users/${userId}/vocab/${selectedItemId}`;
            const documentRef = doc(db, documentPath);
            await deleteDoc(documentRef);
            console.log('Xóa dữ liệu thành công');
            setSelectedItemId(null); // Đặt lại selectedItemId thành null sau khi xóa thành công
        } catch (error) {
            console.error('Lỗi xóa dữ liệu: ', error);
        }
    };
        // Edit
        const [selectedItem, setSelectedItem] = useState(null)
        const handleButtonEditClick = (item) => {
            setSelectedItem({
                id: item.id,
                word: item.word,
                spell: item.spell,
                mean: item.mean,
                type: item.type
            });
        };

    // Filter and Search
    useEffect(() => {
        let filterShowData = [...data];
      
        if (selectedTopic !== 'Tất cả') {
            filterShowData = data.filter(item => item.type === selectedTopic);
        }
      
        if (keyword !== '') {
            filterShowData = filterShowData.filter(item => {
            for (let key in item) {
                if (key !== 'date' && key != 'id'){
                    if (String(item[key]).includes(keyword)) {
                        return item;
                    }
                }
            }
            });
        }
      
        setShowData(filterShowData);
        }, [selectedTopic, keyword]);
    
    return (
        <TableWrapper>
            <NameColumn />
            <ContenWrapper>
                {showData.map((item) => (
                <ContentItem key={item.id}>
                    <Text>{item.word}</Text>
                    <Text>{item.spell}</Text>
                    <Text>{item.mean}</Text>
                    <Text>{item.date ? new Date(item.date.toMillis()).toLocaleString() : ''}</Text>
                    <Icon icon={faPen} color="navy"  onClick={() => handleButtonEditClick(item)}/>
                    <Icon icon={faBan} onClick={() => handleDeleteClick(item.id)} color="red" />
                </ContentItem>
                ))}
            </ContenWrapper>
            
            {selectedItemId && (
                <DelPopUp
                    showDelPopUp={true}
                    onClose={() => setSelectedItemId(null)}
                    onButtonDelClick={handleButtonDelConfirm}/>)}
            {selectedItem && (
                <EditPopUp
                    showEditPopUp={true}
                    onClose={() => setSelectedItem(null)}
                    selectedItem={selectedItem}
                    />)}
        </TableWrapper>
    )
}
export default Table