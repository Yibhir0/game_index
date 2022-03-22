import React, { Component } from 'react';
import TopNav from './navbar/topnav';
import {
    Center, Grid, Text,
    PasswordInput, TextInput, Loader,
    Title, List, Divider, ScrollArea,Avatar, Image, SimpleGrid, Tooltip, Anchor
} from "@mantine/core";
import GraphDash from './graphs/graphDash';
import "../index.css"
import { Link } from 'react-router-dom';



/**
 * This class renders the home page.
 */
class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            games: [],
        };

    }

        
    async componentDidMount() {
        await this.fetchGames();
    }

/***
 * Fetches the games in the DB and adds them to the state.
 */
    async fetchGames() {
        let fetchResponse = await fetch('/games');
        let fetchedGames = await fetchResponse.json();
        let fetchedGamesuh = [];

        for (let i = 0; i < 1000; i++){
            fetchedGamesuh.push({ image: fetchedGames[i].image_URL, gameName: fetchedGames[i].name, gameId: fetchedGames[i]._id })
        }
        this.setState({
            games: fetchedGamesuh
        });
    }

    getimages() {
        
    }

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
                    <ScrollArea style={{ height: 200 }}>
                        <SimpleGrid breakpoints={[{ maxWidth: 200, maxHeight:0}]} cols={this.state.games.length} spacing="100px">
                            {this.state.games.map((image, i) => 
                                <Tooltip withArrow label={this.state.games[i].gameName}>
                                    <Anchor component={Link} to={`/games/${this.state.games[i].gameId}`}>
                                        <Image style={{ minHeight: 100, minWidth: 100 }} src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/${this.state.games[i].image}`} />
                                    </Anchor>
                                </Tooltip>
                            )}
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
