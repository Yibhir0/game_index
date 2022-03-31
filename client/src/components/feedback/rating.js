
import Rating from '@material-ui/lab/Rating';


/**
 * This component is used to rate as well as to display
 * the rating stars when feedback is submited.
 * @param {} props 
 * @returns 
 */

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