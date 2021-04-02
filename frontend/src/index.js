import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './components/App';
import CollectionProvider from './components/context_providers/CollectionProvider';
import axios from 'axios';
import UserProvider from './components/context_providers/UserProvider';

render(
    <Router>
        <UserProvider>
            <CollectionProvider>
                <App />
            </CollectionProvider>
        </UserProvider>
    </Router>
    , document.getElementById("root"));