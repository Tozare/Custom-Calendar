import React from 'react';
import ReactDOM from 'react-dom';
import './app.less'

import {Calendar} from "./components/pages/Calendar";
import {BrowserRouter as Router, Route, Redirect, Link, Switch} from "react-router-dom"

function Home() {
    const date = new Date()
    return (
        <div className='redirect-link'>
            <div>Please, follow this link to get calendar functionality</div>
            <Link to={"/month/"+date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()}>Link to calendar</Link>
        </div>
    )
}


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route path='/(week|month|year|day)/:yearParam/:monthParam/:dayParam/'>
                    <Calendar/>
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('app')
);

