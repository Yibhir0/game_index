import React, { Component } from 'react';
import TopNav from './topnav';
import { Link } from 'react-router-dom';
import { Anchor } from "@mantine/core";


/**
 * This class renders the home page.
 */
class Home extends Component {
    render() {
        return (
            <div className="App">
                <TopNav />
            </div>
        );
    }
}
export default Home;
