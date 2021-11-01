import React, { useEffect, useState } from 'react'
import './Landing.screen.css'
import { AUTH_TOKEN_STORAGE_KEY } from '../../data';
import { useHistory, Link } from 'react-router-dom';

const Landing = () => {
    const history = useHistory();
    const [isloading, setIsLoading] = useState(true);

    useEffect(async () => {
        const token = await localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
        if(token === null) {
            setIsLoading(false)
        } else {
            history.replace("/my")
        }
    }, [])

    if(isloading) {
        return (
            <div className="landing-container">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="landing-container">

            <div className="col1">
                <h2>Todo-Tracker</h2>
                <Link to="/signin">
                    <button className="btn-primary">Login</button>
                </Link>
                <Link to="/signup">
                    <button className="btn-primary">Signup</button>
                </Link>
            </div>

            <div className="col2"></div>
        </div>
    )
}

export default Landing