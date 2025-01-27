import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Anchor } from "@mantine/core";

import SignIn from '../user/signin';
import './styles.css';
/**
 * This class renders the top navigation bar.
 */
class TopNav extends Component {



    render() {
        return (
            <div>
                <h1>Game Index</h1>
                <nav className="topnav"
                >

                    <Anchor component={Link} to={'/'} >
                        Home
                    </Anchor>
                    <Anchor component={Link} to={'/games'} >
                        Games
                    </Anchor>
                    <SignIn />
                </nav>
            </div>
        );
    }
}

export default TopNav;