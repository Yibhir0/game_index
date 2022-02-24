import { Textarea, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';

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
            <Textarea
                required
                label="comment"
                placeholder="Your comment"
                {...form.getInputProps('comment')}
            />
            <Button type="submit">Submit</Button>
        </form>
    );
}