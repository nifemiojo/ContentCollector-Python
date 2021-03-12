import React from 'react';
import { Link } from 'react-router-dom';
import CreateCollection from './CreateCollection';

export default function HomePage() {
    return (
        <div>
            <h1>Collections Feed</h1>
            <h5>This page will display the latest collections of interest to the user</h5>
            <ul>
                <li><Link to="/collection/create">Create a Collection</Link></li>
                <li><Link to="/collection/create">Subscribed Collections</Link></li>
                <li><Link to="/collection/create">My Collections</Link></li>
            </ul>
        </div>
    );
}