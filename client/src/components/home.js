import React, { Component } from 'react';
import TopNav from './navbar/topnav';
import {
    Center, Grid, Text,
    PasswordInput, TextInput, Loader,
    Title, List, Divider, ScrollArea,Avatar, Image, SimpleGrid
} from "@mantine/core";
import GraphDash from './graphs/graphDash';
import "../index.css"



/**
 * This class renders the home page.
 */
class Home extends Component {

    render() {
        return (
            <div>

                <Center style={{ height: 200 }}>
                    <Title align='center' order={1}>
                        Welcome to the most popular <br></br> Gaming Database
                    </Title>
                </Center>

                <Grid justify="center" >
                    <Grid.Col span={12} justify="center">
                        <Text size='xl' align="center"> Everything you need for searching or analyzing games</Text>
                    </Grid.Col>
                </Grid>
                <br></br>
                <Center>
                    <ScrollArea justify="center" align="center" style={{ height: 200, width: 800 }}>
                        <SimpleGrid cols={3} spacing="lg">
                            <Image style={{ height: 100, width: 100 }} src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/duck_hunt_nes.jpg`} />
                            <Image style={{height:100, width:100}} src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/duck_hunt_nes.jpg`} />
                            <Image style={{height:100, width:100}} src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/duck_hunt_nes.jpg`} />
                            <Image style={{height:100, width:100}} src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/duck_hunt_nes.jpg`} />
                            <Image style={{height:100, width:100}} src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/duck_hunt_nes.jpg`} />
                            <Image style={{height:100, width:100}} src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/duck_hunt_nes.jpg`} />
                            <Image style={{ height: 100, width: 100 }} src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/duck_hunt_nes.jpg`} />
                        </SimpleGrid>
                    </ScrollArea>
                </Center>
                <Divider variant="dashed" />


                <GraphDash></GraphDash>

            </div>
        );
    }
}
export default Home;
