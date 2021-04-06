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
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function ExploreFilter({lat,long}) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [value, setValue] = React.useState('hotel');

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
            control={<Radio value="hotel" />}
            label="Hotel"
          />
          <FormControlLabel
            control={<Radio value="restaurant" />}
            label="Restaurant"
          />
          <FormControlLabel
            control={<Radio  value="bar" />}
            label="Bar"
          />
          <FormControlLabel
            control={<Radio value="night_club" />}
            label="Night clubs"
          />
          <FormControlLabel
            control={<Radio  value="movie" />}
            label="Cinema"
          />
          <FormControlLabel
            control={<Radio value="library" />}
            label="Books"
          />
          <FormControlLabel
            control={<Radio value="museum" />}
            label="Museums"
          />
          <FormControlLabel
            control={<Radio value="park" />}
            label="Parks"
          />
          <FormControlLabel
            control={<Radio value="shopping_mall" />}
            label="Shopping"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}