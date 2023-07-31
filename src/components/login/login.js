import { Text, FormWrapper, Icon, LeftForm, RightForm, SocialWrapper, Title, TopLeftForm, Wrapper, Input, ButtonSignIn, ButtonSignUp } from "./loginStyle";
import { initializeApp } from "firebase/app";
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider,FacebookAuthProvider} from "firebase/auth";
import { useState } from "react";
import { auth,db } from "../../firebase";
import { collection,addDoc, query, where, getDocs } from "firebase/firestore";


const Login = () => {
    //Chuyển trang 
    const handleButtonSignUpClick = () => {
        window.location.href = '/signup'
    }
    //Xử lý đăng nhập 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        if (name === 'email') {
          setEmail(value);
        } else if (name === 'password') {
          setPassword(value);
        }
    }
    const handleSignInSubmit = () => {
        if (email == '' || password == '') {
            setErrorMessage('Không được để trống tài khoản hoặc mật khẩu')
        } else if (password.length < 8) {
            setErrorMessage('Mật khẩu phải có từ 8 ký tự')
        } else {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                window.location.href = '/'
            })
            .catch((error) => {
                setErrorMessage(error.message)
                console.log(error.code);
            });
        }
        
    }

    const handleLoginGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
                window.location.href = '/'
            })
            .catch((error) => {
                setErrorMessage("Đăng nhập bằng Google lỗi. Hãy thử lại.");
            });
      };

    const handleFacebookLogin = () => {
        const provider = new FacebookAuthProvider()
        signInWithPopup(auth, provider)
        .then((result) => {
            window.location.href = '/'
        })
        .catch((error) => {
            setErrorMessage('Đăng nhập bằng facebook lỗi. Hãy thử lại')
        })
    }
    return (
        <Wrapper>
            <FormWrapper>
                <LeftForm>
                    <TopLeftForm>
                        <Title>Đăng nhập</Title>
                        <SocialWrapper>
                            <Icon onClick={handleFacebookLogin} icon={faFacebookF} />
                            <Icon onClick={handleLoginGoogle} icon={faGoogle} />
                        </SocialWrapper>
                    </TopLeftForm>
                    <Text fontWeight="500" fontSize="15px" margin="0">EMAIL</Text>
                    <Input placeholder="Nhập email" type="text" name="email" onChange={handleInputChange}></Input>
                    <Text fontWeight="500" fontSize="15px" margin="0">MẬT KHẨU</Text>
                    <Input placeholder="Nhập mật khẩu" type="password" name="password" onChange={handleInputChange}></Input>
                    <Text fontWeight="500" fontSize="13px" margin="0" color="red" 
                          display={errorMessage ? "block" : "none"} >{errorMessage}</Text>
                    <ButtonSignIn onClick={handleSignInSubmit}>ĐĂNG NHẬP</ButtonSignIn>
                </LeftForm>
                <RightForm>
                    <Text fontWeight="800" fontSize="35px" color="white" margin="0 0 15px">Chào mừng đăng nhập</Text>
                    <Text fontWeight="500" fontSize="17px" color="white" margin="0 0 15px">Chưa có tài khoản?</Text>
                    <ButtonSignUp onClick={handleButtonSignUpClick} >Đăng ký</ButtonSignUp>
                </RightForm>
            </FormWrapper>
        </Wrapper>
    )
}

export default Login;