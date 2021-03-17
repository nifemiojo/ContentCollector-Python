import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './components/App';
import CollectionProvider from './components/hooks/collectionHooks';



render(
    <Router>
        <CollectionProvider>
            <App />
        </CollectionProvider>
    </Router>
    , document.getElementById("root"));