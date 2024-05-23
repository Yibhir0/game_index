import { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import SearchGraphs from './searchGraphs';

// This component holds the Modal popup which will hold the SearchGraphs component in the Search page.
export default function SearchPopUp(props) {
    // Click handler for when the button is clicked.
    const [opened, setOpened] = useState(false);

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