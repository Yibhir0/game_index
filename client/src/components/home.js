import React, { Component } from 'react';
import TopNav from './topnav';
import { Link } from 'react-router-dom';
import { Anchor } from "@mantine/core";
import GraphDash from './graphs/graphDash';


/**
 * This class renders the home page.
 */
class Home extends Component {
    render() {
        return (
            <div className="App">

                <div className='home-banner'>
                    <h1>Welcome to the most popular GAMING DATABASE</h1>
                </div>

                <div className='graph-container'>
                    <GraphDash></GraphDash>
                </div>

            </div>
        );
    }
}
export default Home;
