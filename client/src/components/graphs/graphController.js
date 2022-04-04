/* eslint-disable max-len */
import { Component } from "react";

import {
    Center
} from "@mantine/core";
import { Navigate } from "react-router-dom";
import MostSold from './mostSold';
import LeastSold from './leastSold';
import RatingSales from './ratingSales'

/**
 * This component displays the associated graphed that
 * the user requested
 */

class GraphController extends Component {

    constructor(props) {
        super(props)
        this.state = {
            gameId: '',
        }
        this.setId = this.setId.bind(this);
    }

<<<<<<< HEAD
    // _onNearestX = (value, { index }) => {
    //     this.setState({ crosshairValues: this.props.states.graphData.ratingSalesGames[index] });
    // };
=======

    setId(id) {
        console.log(id + " kekek")
        this.setState({ gameId: id })
    }
>>>>>>> 98c72b5521487c1755fb267bf3c28f79c1731614

    render() {
        let graph;
        if (this.props.states.graphType === 'Sold-Most') {
            graph =
                <MostSold popularGames={this.props.states.graphData.popularGames} changeId={this.setId} />

        } else if (this.props.states.graphType === 'Sold-Least') {

            graph =
                <LeastSold leastGames={this.props.states.graphData.leastGames} changeId={this.setId} />
        }
        else {
            graph =
                <RatingSales ratingSalesGames={this.props.states.graphData.ratingSalesGames} changeId={this.setId} />
        }


        if (this.state.gameId) {
            console.log(this.state.gameId)
            let r = 'games/' + this.state.gameId
            return <Navigate to={r} replace={true} />

        }

        else if (this.state.gameId) {
            console.log(this.state.gameId)
            let r = 'games/' + this.state.gameId
            return <Navigate to={r} replace={true} />

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

