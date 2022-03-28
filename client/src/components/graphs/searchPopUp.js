import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import SearchGraphs from './searchGraphs';

export default function SearchPopUp(props) {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Modal
                size="50%"
                opened={opened}
                onClose={() => setOpened(false)}
                title="Visualisation"
            >
                <SearchGraphs allFeedback={props.games} />

            </Modal>

            <Group position="center">
                <Button style={{ margin: "auto" }} variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }}
                    onClick={() => setOpened(true)}
                >
                    Create Graph
                </Button>
            </Group>
        </>
    );
}