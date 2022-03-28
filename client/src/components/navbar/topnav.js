import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Group,
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
                    <Group>
                        <Title> The Game Index </Title>
                        <Button className= 'border-gray-500 rounded-lg hover:bg-gray-300/50 active:bg-gray-500/50' variant="subtle" radius="xs">
                            <Anchor component={Link} to={'/'} >
                                Home
                            </Anchor>
                        </Button>
                        <Button className='border-gray-500 rounded-lg hover:bg-gray-300/50 active:bg-gray-500/50' variant="subtle" radius="xs">
                            <Anchor component={Link} to={'/games'} >
                                Games
                            </Anchor>
                        </Button>
                        <SignIn className="content-end"/>
                    </Group>
                </nav>
            </div>
        );
    }
}

export default TopNav;