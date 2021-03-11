import React from 'react';

export default function Error404() {
    let location = useLocation();

    return (
        <div>
            <h1>
                Resource not found at {location.pathname}
            </h1>
        </div>
    );
    
}