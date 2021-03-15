import React from 'react';
import { Link } from 'react-router-dom';
import CreateCollection from './CreateCollection';

export default function HomePage() {
    return (
        <div>
            <h1>User Dashboard</h1>
            <h5>Page user sees to manage their Collections</h5>
            <ul>
                <li><Link to="/new">Create a Collection (Button)</Link></li>
                <li><a href="/api/collection/userList.json">My Collections</a></li>
            </ul>
        </div>
    );
}