import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import RatingGraph from './ratingGraph';

// This component holds the Modal popup which will hold the RatingGraph
export default function RatingPopUp(props) {
    // Click handler for when the button is clicked
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
                <Button style={{ margin: "auto" }} className="duration-200 shadow-md hover:scale-125 hover:shadow-xl bg-gradient-to-r from-yellow-700 to-yellow-500"
                    onClick={() => setOpened(true)}
                >
                    Rating Graph
                </Button>
            </Group>
        </>
    );
}