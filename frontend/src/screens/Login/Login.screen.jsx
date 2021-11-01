import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator.component'
import Input from '../../components/Input/Input.component'
import './Login.screen.css'

const Login = () => {
    const [username, setUsername] = useState("")
    const [pwd, setPwd] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onUsername = e => {
        setUsername(() => e.target.value)
    }
    
    const onPwd = e => {
        setPwd(() => e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault();

        setIsSubmitting(() => true)
        setTimeout(() => {
            setIsSubmitting(() => false)
        }, 3000)
    }

    return (
        <div className="login-container">
            <div className="row1">
                <h2>Signin</h2>
            </div>

            <div className="row2">
                <form id="form" onSubmit={onSubmit}>
                    <Input
                        type="text"
                        placeholder="Username..."
                        onInput={onUsername}
                        value={username}
                        // errorLog="Error: Username already exists."
                        valueState={setUsername}
                    />
                    
                    <Input
                        type="password"
                        placeholder="Password..."
                        value={pwd}
                        onInput={onPwd}
                        // errorLog="Error: Invalid credentials."
                        valueState={setPwd}
                    />

                    <button className="login-btn-submit" type="submit" disabled={isSubmitting}>
                        { isSubmitting ? (<ActivityIndicator size="2x" />) : ("Submit") }
                    </button>

                    <p>Not an user already? 
                        <Link to="/signup">
                            <span className="login-footer-link">Signup here</span>
                        </Link>
                    </p>
                </form>
            </div>

            <div className="row3">
                <p>...</p>
            </div>
        </div>
    )
}

export default Login