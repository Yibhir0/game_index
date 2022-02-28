import { SegmentedControl } from "@mantine/core";
import { Component, useState } from "react";
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries} from 'react-vis';
import GraphController from "./graphController";

class GraphDash extends Component{

    constructor(props) {
        super(props);

        this.state = {
            games: [],
            graphType: "Popular",
        };
    }
    
    async componentDidMount() {
        await this.fetchGames();
    }


/***
 * Fetches the games in the DB and adds them to the state.
 */
    async fetchGames() {
        let fetchResponse = await fetch('/games');
        let fetchedGames = fetchResponse.json();

        this.setState({
            games: fetchedGames
        });

        console.log(this.state.games)
    }

    render() {
        return (
            <div>
                <div className="centered-and-flexed" >
                    <div className="centered-and-flexed-controls">
                    <SegmentedControl
                        data={[
                            { label: 'Most Popular', value: 'Popular' },
                            { label: 'Highest Rating', value: 'Rating-High' },
                            { label: 'Most Sold', value: 'Sale-Most' },
                            ]}
                            onChange={(value) => {
                                this.setState({ graphType: value })
                        }}    
                        />
                    </div>
                        
                    <GraphController type="Popular" />
                </div>
                


            </div>
        )
    }

}

export default GraphDash;