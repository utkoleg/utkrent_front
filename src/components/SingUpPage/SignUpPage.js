import React, {useState} from 'react';
import {RiEyeCloseLine, RiEyeFill} from "react-icons/ri";
import Apple from "../LogInPage/img/apple_logo.png";
import Google from "../LogInPage/img/google_logo.png";
import Facebook from "../LogInPage/img/facebook_logo.png";
import Vk from "../LogInPage/img/vk_logo.png";
import "./SignUpPage.css"
import UserService from "../Services/UserService";

function SignUpPage() {
    const [user, setUser] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');

    // PASSWORD MISMATCH CHECK
    const [showPassword, setShowPassword] = useState(false);
    const [isMatch, setIsMatch] = useState(true)


    // VARIABLE HANDLERS
    const handleNameChange = (e) => {
        setName(e.target.value);
        updateUser();
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        updateUser();
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        updateUser();
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setIsMatch(value === password);
    };

    const updateUser = () => {
        if(name !== '' && email !== '' && password !== '' && confirmPassword !== '' && isMatch){
            setUser({
                name: name,
                email: email,
                password: password
            });
        } else{
            setUser(null);
        }
    };

    const isButtonActive = password !== '' && confirmPassword !== '' && isMatch;

    const signUpUser = () => {
            UserService.userSignUp(user).then((response) => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="sign-up-div">
            <div className="sign-up-window">
                <div className="sign-up-window-text">
                    <h1>Sign up</h1>
                    <h2>Already have account? <a href="/login" style={{color: "royalblue"}}>Log-in here!</a></h2>
                </div>
                <div className="sign-up-window-input">
                    <input placeholder="Name"
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)}/>
                    <input placeholder="Email address"
                            type="text"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)}/>
                    <div className="password-input">
                        <input
                            placeholder="Password"
                            type={
                                showPassword ? "text" : "password"
                            }
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <button style={{color: "black", background: "none"}} value={showPassword}
                                onClick={() => setShowPassword((prev) => !prev)}>
                            {
                                showPassword ? <RiEyeFill/> : <RiEyeCloseLine/>
                            }
                        </button>

                        <input
                            placeholder="Confirm password"
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                    {!isMatch && (
                        <p style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>
                            Passwords do not match
                        </p>
                    )}
                    <button className="sign-btn"
                            disabled={!isButtonActive}
                            style={{opacity: isButtonActive ? "1" : "0.5"}}>Sign up</button>
                </div>
                <hr style={{width: "85%", margin: "0 auto", marginTop: "20px"}}></hr>
                <div className="sign-up-window-btn">
                    <div className="apple-div">
                        <img src={Apple} alt="1"/>
                    </div>
                    <div className="google-div">
                        <img src={Google} alt="1"/>
                    </div>
                    <div className="facebook-div">
                        <img src={Facebook} alt="1"/>
                    </div>
                    <div className="vk-div">
                        <img src={Vk} alt="1"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;