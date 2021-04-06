import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Radio, RadioGroup } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPlaces } from '../../store/Actions/explore';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position:"fixed",
  },
  innerCol:{
        },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function ExploreFilter({lat,long}) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [value, setValue] = React.useState('tourist_attraction');

  const handleChange = (event) => {
    setValue(event.target.value);
};
useEffect(() => {
    dispatch(getPlaces(lat,long,value))
},[value])

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <FormLabel>Filter by:</FormLabel>
        <RadioGroup value={value} onChange={handleChange}>
            <FormControlLabel
              control={<Radio className="radiobtn"  value="tourist_attraction" />}
              label="Attractions"
            />
             <FormControlLabel
              control={<Radio className="radiobtn" value="movie_theater" />}
              label="Cinema"
            />
              <FormControlLabel
                control={<Radio className="radiobtn" value="library" />}
                label="Books"
              />    
              <FormControlLabel
                control={<Radio className="radiobtn" value="museum" />}
                label="Museums"
              />
              <FormControlLabel
                control={<Radio className="radiobtn" value="park" />}
                label="Parks"
              />
              <FormControlLabel
                control={<Radio className="radiobtn" value="shopping_mall" />}
                label="Shopping"
              />
            <FormControlLabel
              control={<Radio className="radiobtn" value="restaurant" />}
              label="Restaurant"
            />
            <FormControlLabel
              control={<Radio className="radiobtn"  value="bar" />}
              label="Bar"
            />
            <FormControlLabel
              control={<Radio className="radiobtn" value="night_club" />}
              label="Night club"
            />
        <FormControlLabel
            control={<Radio className="radiobtn" value="hotel" />}
            label="Hotel"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}