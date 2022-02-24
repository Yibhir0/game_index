import { Textarea, Button, Grid } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import RatingBox from '../feedback/rating';
import React, { useState } from "react";
import "./styles.css";

export default function FeedbackBox(props) {

    const [rating, setRating] = useState(1);

    const form = useForm({
        initialValues: {
            comment: '',
        }

    });

    const submitComment = (values) => {
        form.reset();
        values.rating = rating;
        props.addComment(values)

    }

    const getRating = (value) => {
        setRating(value);
    }

    return (
        <form onSubmit={form.onSubmit((values) => submitComment(values))}>

            <Grid columns={19}>
                <Grid.Col span={16}>
                    <Textarea size="md"
                        required
                        placeholder="Your comment"
                        {...form.getInputProps('comment')}
                    /></Grid.Col>
                <Grid.Col span={3} style={{ minHeight: 80 }}>
                    <RatingBox rating={1} dis={false} getRating={getRating} />
                    <Button type="submit">Comment/Rate</Button>
                </Grid.Col>
            </Grid>
        </form>
    );
}