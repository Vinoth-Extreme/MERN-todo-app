import React, { useState } from 'react'
import './Signup.screen.css'
import Input from '../../components/Input/Input.component'
import { Link } from 'react-router-dom'
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator.component'

const Signup = () => {
    const [uname, setUname] = useState("")
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [pwdConfirm, setPwdConfirm] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onUname = e => {
        setUname(() => e.target.value)
    }
    
    const onEmail = e => {
        setEmail(() => e.target.value)
    }
    
    const onPwd = e => {
        setPwd(() => e.target.value)
    }
    
    const onPwdConfirm = e => {
        setPwdConfirm(() => e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault();

        setIsSubmitting(() => true)
        setTimeout(() => {
            setIsSubmitting(() => false)
        }, 3000)
    }

    return (
        <div className="signup-container">
            <div className="row1">
                <h2>Signup</h2>
            </div>
            <div className="row2">
                <form id="form" onSubmit={onSubmit}>
                    <Input 
                        type="text"
                        placeholder="New Username..."
                        value={uname}
                        onInput={onUname}
                        valueState={setUname}
                    />
                    <Input 
                        type="email"
                        placeholder="Email..."
                        value={email}
                        onInput={onEmail}
                        valueState={setEmail}
                    />
                    <Input 
                        type="password"
                        placeholder="New Password..."
                        value={pwd}
                        onInput={onPwd}
                        valueState={setPwd}
                    />
                    <Input 
                        type="password"
                        placeholder="Confirm Password..."
                        value={pwdConfirm}
                        onInput={onPwdConfirm}
                        valueState={setPwdConfirm}
                    />

                    <button className="signUp-btn-submit" type="submit" disabled={isSubmitting}>
                        { isSubmitting ? (<ActivityIndicator size="2x" />) : ("Submit") }
                    </button>

                    <p>Having an account already?
                        <Link to="/signin">
                            <span className="signUp-footer-link">Signin here</span>
                        </Link>
                    </p>
                </form>
            </div>
            <div className="row3">...</div>
        </div>
    )
}

export default Signup