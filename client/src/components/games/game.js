
import { Link } from 'react-router-dom';
import { SimpleGrid, Title, Grid } from "@mantine/core";
import { Group, Avatar, Text, Accordion, Image } from '@mantine/core';

/**
 * This class renders the props.game details.
*/

const Game = (props) => {
    const imageURL = "https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/" + props.game.image_URL;

    const AccordionLabel = ({ label, description, imageURL }) => {

        console.log(label)
        return (

            <Group noWrap>
                <Avatar src={imageURL} radius="xl" />
                <div>
                    <Text>{label}</Text>
                    <Text size="sm" color="dimmed" weight={400}>
                        {description}
                    </Text>
                </div>
            </Group>
        );
    }

    const gameDetails = () => {

        let cScore;
        if (props.game.criticscore === 0) {
            cScore = "Not Rated"
        } else {
            cScore = props.game.criticscore;

        }
        return (
            <div>
                <Title order={1}>{props.game.name}</Title>
                <br></br>
                <SimpleGrid cols={4}>
                    <div>
                        <Title order={4}>Publisher:</Title>
                        <Text>{props.game.publisher}</Text>
                        <Title order={4}>Platform:</Title>
                        <Text>{props.game.platform}</Text>
                        <Title order={4}>Genre:</Title>
                        <Text>{props.game.genre}</Text>
                    </div>
                    <div>
                        <Title order={4}>Release Year:</Title>
                        <Text>{props.game.year}</Text>
                        <Title order={4}>Critic Score:</Title>
                        <Text>{cScore}</Text>
                        <Title order={4}>ESRB Rating:</Title>
                        <Text>{props.game.esrbrating}</Text>
                    </div>
                    <div>
                        <Title order={4}>North American Sales:</Title>
                        <Text>{props.game.nasales}</Text>
                        <Title order={4}>European Sales:</Title>
                        <Text>{props.game.eusales}</Text>
                        <Title order={4}>Japanese Sales:</Title>
                        <Text>{props.game.jpsales}</Text>
                    </div>
                    <div>
                        <Title order={4}>Other Sales:</Title>
                        <Text>{props.game.othersales}</Text>
                        <Title order={4}>Global Sales:</Title>
                        <Text>{props.game.globalsales}</Text>
                    </div>
                </SimpleGrid>

            </div>

        );
            // "Name: " + props.game.name + " \n" +
            // "Publisher: " + props.game.publisher + " \n" +
            // "Platform: " + props.game.platform + " \n" +
            // "Genre: " + props.game.genre + " \n" +
            // "Release Year: " + props.game.year + " \n" +
            // "Critic Score: " + cScore + " \n" +
            // "ESRB Rating: " + props.game.esrbrating + " \n" +
            // "North American Sales: " + Number(props.game.nasales).toLocaleString() + " \n" +
            // "European Sales: " + Number(props.game.eusales).toLocaleString() + " \n" +
            // "Japanese Sales: " + Number(props.game.jpsales).toLocaleString() + " \n" +
            // "Other Sales: " + Number(props.game.othersales).toLocaleString() + " \n" +
            // "Global Sales: " + Number(props.game.globalsales).toLocaleString());

    }


    return (
        <div style={{ margin: 'auto', padding: 50 }}>
            <Grid columns={12}>
                <Grid.Col span={2}>

                    <Image src={imageURL} width={200} alt={props.game.name} />

                </Grid.Col>
                <Grid.Col span={10} >
                    <Text size="sm">{gameDetails()}</Text>
                </Grid.Col>
            </Grid>
        </div>
    );
}

export default Game;