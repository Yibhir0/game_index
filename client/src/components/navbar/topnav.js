import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Text,
    Anchor,
    Title,
    Button,
    SimpleGrid,
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
                <Title
                    color="blue"
                    weight={700}
                    size="xl"
                >
                    Game Index
                </Title>
                <br></br>
                <nav className="topnav"
                >
                    <SimpleGrid cols={14}>
                        <div>
                            <Button variant="subtle" radius="xs">
                                <Anchor component={Link} to={'/'} >
                                    Home
                                </Anchor>
                            </Button>
                        </div>
                        <div>
                            <Button variant="subtle" radius="xs">
                                <Anchor component={Link} to={'/games'} >
                                    Games
                                </Anchor>
                            </Button>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>   
                            <SignIn />
                        </div>
                    </SimpleGrid>

                </nav>
            </div>
        );
    }
}

export default TopNav;