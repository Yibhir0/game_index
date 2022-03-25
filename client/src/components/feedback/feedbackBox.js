import { Textarea, Button, Grid, Center } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import RatingBox from '../feedback/rating';
import React, { useEffect, useState } from "react";
export default function FeedbackBox(props) {


    useEffect(() => {

        //fetchFeedback();

    }, []);


    // const fetchGame = async () => {
    //     const url = `/games/${id}`;
    //     try {
    //         const response = await fetch(url);
    //         const json = await response.json();
    //         setGame(json);

    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // };

    const [rating, setRating] = useState(1);
    //let navigate = useNavigate();


    const form = useForm({
        initialValues: {
            comment: '',
        }

    });

    const submitComment = (values) => {
        values.rating = rating;
        setRating(1);
        props.addComment(values);
        form.reset();
    }

    const getRating = (value) => {
        setRating(value);
    }

    return (


        <form onSubmit={form.onSubmit((values) => submitComment(values))}>

            <Grid justify="space-between" >
                <Grid.Col span={10} >
                    <Textarea size="xl"
                        required
                        placeholder="Your comment"

                        {...form.getInputProps('comment')}
                    /></Grid.Col>
                <Grid.Col style={{ minHeight: 80 }} span={2}>
                    <RatingBox rating={rating} dis={false} getRating={getRating} />
                    <Button type="submit">Comment/Rate</Button>
                </Grid.Col>

            </Grid>
        </form>


    );
}