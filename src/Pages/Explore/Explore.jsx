import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {getPlaces} from "../../store/Actions/explore"
import "../styles.css"
import background from "../../icon/travelers.png"
import ExploreList from "../../components/ExploreList/ExploreList"
export default function Explore() {
    const [lat, setLat] = useState();
    const [long, setLong] = useState();

    function getLocation() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getCoordinates)
        }
    }
    function getCoordinates(position){
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
        console.log(lat)
        console.log(long)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(lat,long,"lat and long")
        if(lat && long === undefined) {
            return null
        } else {
            dispatch(getPlaces(lat,long))
        }
    },[])

    return (    
        <div className="explore-page">
            <img className="explore-background img-fluid" src={background} />
            <h1 className="explore-title">Find places around you and invite your friends to meet there!</h1>
           {/* <button onClick={getLocation}>location</button> */}
            <ExploreList /> 
        </div>
    )
}
