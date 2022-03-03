import { Center, Grid, SegmentedControl } from "@mantine/core";
import { Component, useState } from "react";
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries } from 'react-vis';
import GraphController from "./graphController";

class GraphDash extends Component {

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
        let fetchedGames = await fetchResponse.json();


        this.setState({
            games: fetchedGames
        });


    }

    changeState(value) {
        this.setState({ graphType: value })
    }

    // componentDidUpdate(prevProps){
    //     if(prevProps.graphType !== this.props.graphType){
    //         this.setState({          
    //             graphType: this.props.graphType
    //         });
    //         this.forceUpdate();
    //     }
    // }

    render() {
        return (
            <Grid>
                <Grid.Col span={12} justify="center" align="center">
                    <SegmentedControl
                        data={[
                            { label: 'Most Popular', value: 'Popular' },
                            { label: 'Highest Rating', value: 'Rating-High' },
                            { label: 'Most Sold', value: 'Sale-Most' },
                        ]}

                        onChange={(value) => {
                            this.changeState(value)
                        }}
                    />

                </Grid.Col>

                <Grid.Col>
                    <GraphController graphData={this.state} />
                </Grid.Col>
            </Grid>
        )
    }

}

export default GraphDash;