import React from 'react';
import { useState } from "react";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function RatingBox(props) {

  const [ratingValue, setRatingValue] = useState(props.rating);
  return (
    //<div style={{ display: 'block', padding: 30 }}>
    // <Box component="fieldset" mb={3} borderColor="transparent">
    //   <Typography component="legend">
    //     rate
    //   </Typography>
    <Rating disabled={props.dis}
      name="Rating Label"
      value={ratingValue}
      onChange={(event, newValue) => {
        setRatingValue(newValue);
        props.getRating(newValue);
      }}
    />
    // </Box>
    // </div>
  );
}