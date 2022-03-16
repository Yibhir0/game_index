import React, { Component } from 'react';
import TopNav from './navbar/topnav';
import {
    Center, Grid, Text,
    PasswordInput, TextInput, Loader,
    Title, List, Divider
} from "@mantine/core";
import GraphDash from './graphs/graphDash';



/**
 * This class renders the home page.
 */
class Home extends Component {



    render() {
        return (
            <div className="App">

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

                <Divider variant="dashed" />


                <GraphDash></GraphDash>

            </div>
        );
    }
}
export default Home;
