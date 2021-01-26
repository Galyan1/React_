import React from 'react';
import './app-header.css';

const AppHeader = ({like, allPosts}) => {

return (
    <div className = 'app-header d-flex'>
        <h1>Devyatova Galina</h1>
        <h2>{allPosts} запией, понравилось {like}</h2>
    </div>
)
}

export default AppHeader;