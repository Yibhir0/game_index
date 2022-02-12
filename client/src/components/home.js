import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/**
 * This class renders the home page.
 */
class Home extends Component {
    render() {
        return (
            <div className="App">
                <h1>Game Index</h1>
                <Link to={'./games'}>
                    <button variant="raised">
                        Games
                    </button>
                </Link>
            </div>
        );
    }
}
export default Home;
