import React, { useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from '../../config/firebase';
import "./login.css"
const Login = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [message, setmessage] = useState("")
    const [messagetype, setmessagetype] = useState("")
    var regex = "yekiviv162@ippals.com"

    var match ="ParVeZ12!"

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === "") {
            setmessage("Email Address Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessagetype("")
            }, 2000);
        }
        else if (!email.match(regex)) {
            setmessage("Please Enter Valid Email Address")
            setmessagetype("error")
            setTimeout(() => {
                setmessagetype("")
            }, 2000);
        }
        else if (password === "") {
            setmessage("Password Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessagetype("")
            }, 2000);
        }
        else if (!password.match(match)) {
            setmessage("Password Not Crreact")
            setmessagetype("error")
            setTimeout(() => {
                setmessagetype("")
            }, 2000);
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (userCredential.user.emailVerified === false) {
                        sendEmailVerification(userCredential.user)
                        navigate("/EmailVerfication")
                    }
                    setmessage("Success")
                    setmessagetype("Success")
                    setTimeout(() => {
                        navigate("/")
                        setmessagetype("")
                    }, 2000);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setmessage(errorMessage)
                    setmessagetype("error")
                    setTimeout(() => {
                        setmessagetype("")
                    }, 2000);
                });
        }
    };



    return (
        <div className='signup-div'>
            <main>
                <div class="login-container">
                    {/* <img src={avatar} alt="" class="img-avatar" /> */}
                    <h1 class="title">Sign in</h1>

                    <form onSubmit={handleSubmit}>
                        <div class="input-box">
                            <input type="text" class="input" placeholder="Email Address" value={email} onChange={(e) => setemail(e.target.value)} />
                            <i class='bx bxs-envelope bx-sm'></i>
                        </div>

                        <div class="input-box">
                            <input type="password" class="input" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                            <i class='bx bxs-lock-alt bx-sm'></i>
                        </div>
                        {messagetype !== "" && <div className='alert-div'>
                            <div class={messagetype === "error" ? "alert alert-danger" : "alert alert-success"} role="alert">
                                {message}
                            </div>
                        </div>}
                        <div>
                            <button className='signIN'>Sign In</button>
                        </div>
                    </form>
                </div>
            </main >
            <section class="illustration-container">
                {/* <img src={illustration} /> */}
                <div class="circle"> </div>
            </section>
        </div >
    )
}

export default Login

