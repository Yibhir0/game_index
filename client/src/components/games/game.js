import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from "@mantine/core";
import { Group, Avatar, Text, Accordion, Image } from '@mantine/core';



/**
 * This class renders the game details.
 */


function AccordionLabel({ label, description, imageURL }) {
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

// function gameDetail(game){

// }

function Game(props) {

    console.log(props.game)
    const imageurl = "https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/" + props.game.image_URL;
    let cScore;
    if (props.game.criticscore === 0) {
        cScore = "Not Rated"
    } else {
        cScore = props.game.criticscore;

    }
    
    
    const gameDetails = 
    "Name: " + props.game.name + " \n" +
    "Publisher: " + props.game.publisher + " \n" +
    "Platform: " + props.game.platform + " \n" +
    "Genre: " + props.game.genre + " \n" +
    "Release Year: " + props.game.year + " \n" +
    "Critic Score: " + cScore + " \n" +
    "ESRB Rating: " + props.game.esrbrating + " \n" +
    "North American Sales: " + Number(props.game.nasales).toLocaleString() + " \n" +
    "European Sales: " + Number(props.game.eusales).toLocaleString() + " \n" +
    "Japanese Sales: " + Number(props.game.jpsales).toLocaleString() + " \n" +
    "Other Sales: " + Number(props.game.othersales).toLocaleString() + " \n" +
    "Global Sales: " + Number(props.game.globalsales).toLocaleString();

    return (
        <Accordion initialItem={-1} iconPosition="right">
            <Accordion.Item label={<AccordionLabel label={props.game.name} description={props.game.year} imageURL={imageurl} />}>
                <Grid columns={12}>
                    <Grid.Col span={2}>

                        <Image src={imageurl} width={200} alt={props.game.name} />

                    </Grid.Col>
                    <Grid.Col span={10} >
                        <Text size="sm">{gameDetails}</Text>
                    </Grid.Col>
                </Grid>
            </Accordion.Item>
            {/* ... other items */}
        </Accordion>
    );
}
export default Game;