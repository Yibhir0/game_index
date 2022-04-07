import { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import SearchGraphs from './searchGraphs';

export default function SearchPopUp(props) {
    const [opened, setOpened] = useState(false);
    console.log(props.games.slice(props.page * 10 - 10, props.page * 10))

    return (
        <>
            <Modal
                size="40%"
                opened={opened}
                onClose={() => setOpened(false)}
                title="Visualisation"
            >
                <SearchGraphs gamesInPage={props.games.slice(props.page * 10 - 10, props.page * 10)} />

            </Modal>

            <Button className="duration-200 shadow-md hover:scale-110 bg-zinc-900 hover:bg-yellow-600" variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }}
                onClick={() => setOpened(true)}
            >
                Visualize Graph
            </Button>
        </>
    );
}