import React from 'react';
import Rating from '@material-ui/lab/Rating';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

export default function RatingBox(props) {

  return (

    <Rating disabled={props.dis}
      name="Rating Label"
      value={props.rating}
      onChange={(event, newValue) => {
        props.getRating(newValue);
      }}
    />

  );
}