import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './components/App';
import CollectionProvider from './components/context_providers/CollectionProvider';
import axios from 'axios';
import UserProvider from './components/context_providers/UserProvider';

axios.defaults.baseURL = 'http://127.0.0.1:8080/';
const localState = JSON.parse(localStorage.getItem('user'));

Object.keys(localState).length !== 0 
? axios.defaults.headers.common['Authorization'] = 'Bearer ' + localState.tokens.access 
: axios.defaults.headers.common['Authorization'] = "";

render(
    <Router>
        <UserProvider>
            <CollectionProvider>
                <App />
            </CollectionProvider>
        </UserProvider>
    </Router>
    , document.getElementById("root"));