import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {getPlaces} from "../../store/Actions/explore"
import "../styles.css"
import background from "../../icon/travelers.png"
import ExploreList from "../../components/ExploreList/ExploreList"
export default function Explore() {

    return (    
        <div className="explore-page">
            <img className="explore-background img-fluid" src={background} />
            <h1 className="explore-title">Find places around you and invite your friends to meet there!</h1>
           {/* <button onClick={getLocation}>location</button> */}
            <ExploreList /> 
        </div>
    )
}
