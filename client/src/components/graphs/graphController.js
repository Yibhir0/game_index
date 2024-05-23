import { Component } from "react";

import {
    Center
} from "@mantine/core";
import { Navigate } from "react-router-dom";
import MostSold from './mostSold';
import LeastSold from './leastSold';
import RatingSales from './ratingSales'

/**
 * This component displays the associated graph that
 * the user requested in the home page
 */
class GraphController extends Component {

    constructor(props) {
        super(props)
        this.state = {
            gameId: '',
        }
        this.setId = this.setId.bind(this);
    }

    /**
     * Sets the gameId state to the passed parameter
     * @param {ObjectID} id 
     */
    setId(id) {
        this.setState({ gameId: id })
    }

    /**
     * 
     * @returns Div containing a centered graph
     */
    render() {
        let graph;
        // Build the appropriate graph component according to the graphType value
        if (this.props.states.graphType === 'Sold-Most') {
            graph =
                <MostSold popularGames={this.props.states.graphData.popularGames} changeId={this.setId} />

        }
        else if (this.props.states.graphType === 'Sold-Least') {
            graph =
                <LeastSold leastGames={this.props.states.graphData.leastGames} changeId={this.setId} />
        }
        else {
            graph =
                <RatingSales ratingSalesGames={this.props.states.graphData.ratingSalesGames} changeId={this.setId} />
        }

        // Pass the game id to the Navigate component to allow the page to redirect to the clicked game page
        if (this.state.gameId) {
            let url = 'games/' + this.state.gameId
            return <Navigate to={url} replace={true} />

        }

        return (

            <div>
                <Center style={{ height: 400, textAlign: 'center' }}>
                    {graph}
                </Center>
            </div>
        )
    }

}

export default GraphController;

