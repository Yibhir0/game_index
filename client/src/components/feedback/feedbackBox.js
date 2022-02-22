import { Textarea, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import RatingBox from '../feedback/rating';

import "./styles.css";

export default function FeedbackBox(props) {
    const form = useForm({
        initialValues: {
            comment: '',
        }

    });

    const submitComment = (values) => {
        form.reset();
        props.addComment(values)

    }


    return (
        <form onSubmit={form.onSubmit((values) => submitComment(values))}>
            <div className="horizontal_flex">
            <Textarea
                required
                label="comment"
                placeholder="Your comment"
                {...form.getInputProps('comment')}
            />
            <RatingBox rating={1}/>
            </div>
           
            <Button type="submit">Submit</Button>
        </form>
    );
}