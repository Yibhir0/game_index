import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Anchor } from "@mantine/core";


/**
 * This class renders the home page.
 */
class Home extends Component {
    render() {
        return (
            <div className="App">
                <h1>Game Index</h1>
                <Anchor component={Link} to={'./games'} >
                    Games
                </Anchor>

            </div>
        );
    }
}
export default Home;
