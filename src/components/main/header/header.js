import { faHouse, faSpellCheck, faUser, faWarning } from "@fortawesome/free-solid-svg-icons"
import { Logo, NavContainer, NavItem, Wrapper, Text, Icon } from "./headerStyle"
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, onSnapshot } from "firebase/firestore"; 
const Header = ({setPage}) => {
    // Khởi tạo firebase
    const firebaseConfig = {
        apiKey: "AIzaSyBfhc7FH_YsNAkhH9--zSM9AhrAeAgc5rM",
        authDomain: "cnweb-eb7f0.firebaseapp.com",
        projectId: "cnweb-eb7f0",
        storageBucket: "cnweb-eb7f0.appspot.com",
        messagingSenderId: "210269192640",
        appId: "1:210269192640:web:a778b65051c416e6158825"
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const db = getFirestore(app);
    //Check login
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
          if (user) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        });
        //Del effect when component is deleted
        return () => unsubscribe();
    }, []);
    // Đổi màu khi nhấn
    
    const itemColor= ['#FF3333', 'rgb(189 189 189)']
    const [selectedPage, setSelectedPage] = useState(0);
    const handleNavItemClick = (index) => {
        setSelectedPage(index);
        if (index === 0) {
            setPage('home')
        } else if (index === 1) {
            if(!isLoggedIn){
                window.location.href = '/login'
            }
            else {
                setPage('profile')
            }
        } else if (index === 2) {
            if(!isLoggedIn){
                window.location.href = '/login'
            }
            else {
                setPage('test')
            }
        }
    };
    return (
        <Wrapper>
            <Logo></Logo>
            <NavContainer>
                <NavItem onClick={() => handleNavItemClick(0)}>
                    <Text margin='0' color={selectedPage === 0 ? itemColor[0] : itemColor[1]} fontWeight="700">Trang Chủ</Text>
                    <Icon margin='0px 0px 0px 7px' icon={faHouse} color={selectedPage === 0 ? itemColor[0] : itemColor[1]}></Icon>
                </NavItem>
                <NavItem onClick={() => handleNavItemClick(1)}>
                    <Text margin='0' color={selectedPage === 1 ? itemColor[0] : itemColor[1]}>Hồ sơ</Text>
                    <Icon margin='0px 0px 0px 7px' icon={faUser} color={selectedPage === 1 ? itemColor[0] : itemColor[1]}></Icon>
                </NavItem>
                <NavItem onClick={() => handleNavItemClick(2)}>
                    <Text margin='0' color={selectedPage === 2 ? itemColor[0] : itemColor[1]}>Kiểm tra</Text>
                    <Icon margin='0px 0px 0px 7px' icon={faSpellCheck} color={selectedPage === 2 ? itemColor[0] : itemColor[1]}></Icon>
                </NavItem>
            </NavContainer>
        </Wrapper>
)
}

export default Header