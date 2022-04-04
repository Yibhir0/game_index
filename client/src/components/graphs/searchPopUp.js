import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import SearchGraphs from './searchGraphs';

export default function SearchPopUp(props) {
    const [opened, setOpened] = useState(false);
    console.log(props.games.slice(props.page*10-10, props.page*10))

    return (
        <>
            <Modal
                size="50%"
                opened={opened}
                onClose={() => setOpened(false)}
                title="Visualisation"
            >
                <SearchGraphs gamesInPage={props.games.slice(props.page*10-10, props.page*10)} />

            </Modal>

            <Group position="left">
                <Button className="bg-gradient-to-b from-gray-700 to-gray-600" style={{ margin: "left" }} variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }}
                    onClick={() => setOpened(true)}
                >
                    Create Graph
                </Button>
            </Group>
        </>
    );
}