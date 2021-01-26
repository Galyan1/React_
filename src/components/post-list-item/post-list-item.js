import React from 'react';
import './post-list-item.css';

 const PostListItem =({label, onDelete, onToggleImportant, onToggleLike, like, important}) =>{

        let classNames = 'btn-star btn-sm';
        let heart = 'fa fa-heart';
        if (important){
            classNames += ' important';
        }

        if (like){
            heart += ' like';
        }
        return (
            <div className = 'app-list-item d-flex justify-content-between' >
                <span className = 'app-list-item-label' onClick = {onToggleLike}>
                    {label}
                </span>
                <div className = 'd-flex justify-content-center align-items-center'>
                    <button type = 'button' className ={classNames} onClick = {onToggleImportant} >
                        <i className = 'fa fa-star'></i>
                    </button>
                    <button type = 'button' className = 'btn-trash btn-sm' onClick={onDelete}>
                        <i className = 'fa fa-trash o'></i>
                    </button>
                    <i className = {heart}></i>
                </div>
            </div>
        )
    
}
export default PostListItem;
