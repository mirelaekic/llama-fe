import React from 'react'
import "../styles.css"
import SearchIcon from '@material-ui/icons/Search';

export default function Search() {
    return (
        <div className="search">
            <div className="input-icon">
            <SearchIcon />
            </div>
            <input className="search-field" placeholder="Search..."/>
        </div>
    )
}
