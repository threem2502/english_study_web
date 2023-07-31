import { styled } from "styled-components";
import {Text, FormWrapper, Icon, LeftForm, RightForm, SocialWrapper, Title, TopLeftForm, Wrapper, Input, ButtonSignIn, ButtonSignUp} from "../login/loginStyle";
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";


const SignUp = () => {
    //Firebase key
    
    //Chuyển trang 
    const handleButtonSignInClick = () => {
        window.location.href = '/login'
    }
    // Xử lý đăng ký
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cfPassword, setCfPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        if (name === 'email') {
          setEmail(value);
        } else if (name === 'password') {
          setPassword(value);
        } else if (name === 'cfPassword') {
          setCfPassword(value);
        }
    }
    const handleSignUpSubmit = () => {
        if (email == '' || password == '' || cfPassword == '' ) {
            setErrorMessage('Không được để trống tài khoản hoặc mật khẩu')
        } else if (password.length < 8) {
            setErrorMessage('Mật khẩu phải có từ 8 ký tự')
        } else if (password != cfPassword) {
            setErrorMessage('Mật khẩu và xác nhận mật khẩu không trùng nhau')
        } else {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const usersRef = collection(db, "users");
                addDoc(usersRef, {
                    email: userCredential.user.email
                })
                .then(() => {
                    window.location.href = '/'
                })
                .catch((error) => {
                   setErrorMessage(error.message)
                });
            })

            .catch((error) => {
                const errorCode = error.code
                setErrorMessage(error.message)
                console.log(error.code);
            });
            }
    }
    return (
        <Wrapper>
            <FormWrapper>
                <RightForm>
                    <Text fontWeight="800" fontSize="35px" color="white" margin="0 0 15px">Chào mừng đăng ký</Text>
                    <Text fontWeight="500" fontSize="17px" color="white" margin="0 0 15px">Đã có tài khoản?</Text>
                    <ButtonSignUp onClick={handleButtonSignInClick}>Đăng nhập</ButtonSignUp>
                </RightForm>
                <LeftForm>
                    <Text fontWeight="500" fontSize="15px" margin="0">EMAIL</Text>
                    <Input placeholder="Nhập email" type="text" name="email" onChange={handleInputChange}></Input>
                    <Text fontWeight="500" fontSize="15px" margin="0">MẬT KHẨU</Text>
                    <Input placeholder="Nhập mật khẩu" type="password" name="password" onChange={handleInputChange}></Input>
                    <Text fontWeight="500" fontSize="15px" margin="0">XÁC NHẬN MẬT KHẨU</Text>
                    <Input placeholder="Nhập lại mật khẩu" type="password" name="cfPassword" onChange={handleInputChange}></Input>
                    <Text fontWeight="500" fontSize="13px" margin="0" color="red" 
                          display={errorMessage ? "block" : "none"} >{errorMessage}</Text>
                    <ButtonSignIn onClick={handleSignUpSubmit}>Sign Up</ButtonSignIn>
                </LeftForm>
                
            </FormWrapper>
        </Wrapper>
    )
}

export default SignUp