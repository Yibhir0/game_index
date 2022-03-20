import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import RatingGraph from './ratingGraph';

export default function RatingPopUp(props) {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Rating "
            >
                <RatingGraph allFeedback={props.allFeedback} />
            </Modal>

            <Group position="center">
                <Button style={{ margin: "auto" }} variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }}
                    onClick={() => setOpened(true)}
                >
                    Rating Graph
                </Button>
            </Group>
        </>
    );
}