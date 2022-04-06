import { Textarea, Button, Grid, Center } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import RatingBox from '../feedback/rating';
import React, { useState } from "react";
import {
    IconMessagePlus,
} from '@tabler/icons';
import { showNotification } from "@mantine/notifications";

/**
 * This component allow user to add a comment/feedback
 * It receives a callback function that adds the
 *  comment to the db and render the component.
 * @param {*} props 
 * @returns 
 */
export default function FeedbackBox(props) {


    const [rating, setRating] = useState(1);

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

    const displayNotification = (title, desc, color, icon) => {
        showNotification({
            title: title,
            color: color,
            icon: icon,
            style: {
                backgroundColor: '#18181b',
                borderColor: '#18181b'
            },
            styles: (theme) => ({
                title: { color: theme.white },
                description: { color: theme.white },
                closeButton: {
                    color: theme.colors.red[7]
                  },
            }),
            message: desc,
        })
    }
    
    return (

        <Center>
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
                        <Button onClick={() => {
                            displayNotification(
                                'Comment Added',
                                `Comment has been successfully added to the game page`,
                                'green',
                                <IconMessagePlus />,
                            )
                        }}
                            className="bg-gradient-to-b from-gray-700 to-gray-600" type="submit">Comment/Rate</Button>
                    </Grid.Col>

                </Grid>
            </form>

        </Center>


    );
}