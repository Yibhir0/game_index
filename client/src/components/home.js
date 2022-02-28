import React, { Component } from 'react';
import TopNav from './topnav';
import {
    Center, Grid, Text,
    PasswordInput, TextInput, Loader,
    Title, List, Divider
} from "@mantine/core";
import GraphDash from './graphs/graphDash';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, FlexibleXYPlot, XAxis, YAxis, VerticalBarSeries} from 'react-vis';



/**
 * This class renders the home page.
 */
class Home extends Component {


    render() {
        return (
            <div className="App">

                <Center style={{ height: 200 }}>
                    <Title order={1}>
                        Welcome to the most popular <br></br> <Title align='center'>Gaming Database </Title>
                    </Title>
                </Center>
                
                <Grid justify="center" >
                    <Grid.Col span={6} justify="center">
                        <Text size='xl' align="center"> Everything you need for searching or analyzing games</Text>
                            <List withPadding >
                                <List.Item>Search Feature</List.Item>
                                <List.Item>Filter/Sorting System</List.Item>
                                <List.Item>Generated Graphs</List.Item>
                                <List.Item>User Based Game Feeback</List.Item>
                                <List.Item>Create your own Personalized List </List.Item>
                            </List>
                    </Grid.Col>

                    <Grid.Col span={6} align="center">

                        <TextInput
                            label="Username"
                            placeholder="Your username"
                            rightSection={<Loader size="xs" />}
                            style={{ maxWidth: 250 }} 
                            />
                        
                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            style={{ maxWidth:250 }}
                        />

                    </Grid.Col>
                </Grid>     

                <Divider variant="dashed" />


                <GraphDash type ="Popular"></GraphDash>

            </div>
        );
    }
}
export default Home;
