import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Anchor } from "@mantine/core";


/**
 * This class renders the top navigation bar.
 */
export default class TopNav extends Component {
    render() {
        return (
            <div>
                <h1>Game Index</h1>
                <nav
                    classname="topnav"
                    style={{
                        borderBottom: "solid 1px",
                        paddingBottom: "1rem"
                    }}
                >
                    
                    <Anchor component={Link} to={'/'} >
                        Home
                    </Anchor>
                    <Anchor component={Link} to={'/games'} >
                        Games
                    </Anchor>
                    <Anchor component={Link} to={'/profile'} >
                        Profile
                    </Anchor>
                </nav>
            </div>
        );
    }
}