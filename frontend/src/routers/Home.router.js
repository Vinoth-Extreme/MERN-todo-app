import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../screens/Home/Home.screen'
import Landing from '../screens/Landing/Landing.screen'
import Login from '../screens/Login/Login.screen'
import Signup from '../screens/Signup/Signup.screen'

const RouteHandler = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/signin" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/my" exact component={Home} />
            </Switch>
        </Router>
    )
}

export default RouteHandler;