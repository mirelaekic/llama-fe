import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "../styles.css"
import background from "../../icon/travelers.png"
import ExploreList from "../../components/ExploreList/ExploreList"
import { getMe } from '../../store/Actions/user';
export default function Explore() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMe());
      }, []);
    const user = useSelector((state) => state.user.user);
    return user ? (    
        <div className="explore-page">
            <img className="explore-background img-fluid" src={background} />
            <h1 className="explore-title">Find places around you and invite your friends to meet there!</h1>
            <ExploreList /> 
        </div>
    ) : <CircularProgress />
}
