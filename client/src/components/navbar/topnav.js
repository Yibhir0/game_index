import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Text,
    Anchor,
    Title,
    Button,
    Grid,
    Avatar,
    Image,
} from "@mantine/core";

import SignIn from '../user/signin';
import './styles.css';
/**
 * This class renders the top navigation bar.
 */
class TopNav extends Component {



    render() {
        return (
            <div>
                <br></br>
                <nav className="topnav"
                >
                    <Grid justify="space-between" align="flex-end" columns={15}>
                        <Grid.Col span={3}>
                            <Title> The Game Index </Title>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Button className= 'border-gray-500 rounded-lg hover:bg-gray-300/50 active:bg-gray-500/50' variant="subtle" radius="xs">
                                <Anchor component={Link} to={'/'} >
                                    Home
                                </Anchor>
                            </Button>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Button className='border-gray-500 rounded-lg hover:bg-gray-300/50 active:bg-gray-500/50' variant="subtle" radius="xs">
                                <Anchor component={Link} to={'/games'} >
                                    Games
                                </Anchor>
                            </Button>
                        </Grid.Col >
                        <Grid.Col span={3} offset={3}>
                            <SignIn className="content-end"/>
                        </Grid.Col>
                    </Grid>
                </nav>
            </div>
        );
    }
}

export default TopNav;