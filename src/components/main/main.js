import { styled } from "styled-components"
import Header from "./header/header"
import Home from "./home/home"
import { useState, useEffect } from "react"
import Test from "./test/test"
import Profile from "./profile/profile"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase"

const Wrapper = styled.div`
    margin: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
`

const Main = () => {
    // Check user
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserID(user.uid);
        } else {
            setUserID(null);
        }
        });
        return () => unsubscribe();
    }, []);
    // Render Page
    const [page, setPage] = useState('home')
    let content = null;
    if (page === 'home') {
        content = <Home />;
    } else if (page === 'test') {
        content = <Test userID={userID} />;
    } else if (page === 'profile') {
        content = <Profile userID={userID} />;
    }
   

    return (
        <Wrapper>
            <Header setPage={setPage} />
            {content}
        </Wrapper>
    )
}

export default Main