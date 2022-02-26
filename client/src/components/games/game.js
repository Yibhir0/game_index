import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from "@mantine/core";
import { Group, Avatar, Text, Accordion, Image } from '@mantine/core';
const l = `jpsales: { type: Number },
nasales: { type: Number },
othersales: { type: Number },
eusales: { type: Number },
platform: { type: String },
year: { type: Number },
publisher: { type: String },
esrbrating: { type: String },
criticscore: { type: Number },
globalsales: { type: Number },
name: { type: String },
genre: { type: String },
feedback: [feedbackModel],
userrating: { type: Number }`;



/**
 * This class renders the game details.
 */


function AccordionLabel({ label, description }) {
    return (
        <Group noWrap>
            <Avatar src={require("./index.png")} radius="xl" />
            <div>
                <Text>{label}</Text>
                <Text size="sm" color="dimmed" weight={400}>
                    {description}
                </Text>
            </div>
        </Group>
    );
}

function Game(props) {
    return (
        <Accordion initialItem={-1} iconPosition="right">
            <Accordion.Item label={<AccordionLabel label={props.game.name} description={props.game.year} />}>
                <Grid columns={12}>
                    <Grid.Col span={2}>
                        <Image src={require("./index.png")} width={200} alt={props.game.name} />
                    </Grid.Col>
                    <Grid.Col span={10} >
                        <Text size="sm">{l}</Text>
                    </Grid.Col>
                </Grid>




            </Accordion.Item>
            {/* ... other items */}
        </Accordion>
    );
}
export default Game;