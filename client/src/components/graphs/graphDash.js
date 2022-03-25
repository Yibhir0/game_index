import { Center, Grid, SegmentedControl } from "@mantine/core";
import { Component, useState } from "react";
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries } from 'react-vis';
import GraphController from "./graphController";

class GraphDash extends Component {

    constructor(props) {
        super(props);

        this.state = {
            games: [],
            graphType: "Sold-Most",
            graphData: {
                popularGames: [],
                ratingSalesGames: [],
                leastGames: []

            }
        };

        this.changeGraph = this.changeGraph.bind(this);
    }


    async componentDidMount() {
        await this.fetchGames();
        this.getGraphDatas();
    }

    /***
     * Fetches the games in the DB and adds them to the state.
     */
    async fetchGames() {
        let fetchResponse = await fetch('/games-');
        let fetchedGames = await fetchResponse.json();

        this.setState({
            games: fetchedGames
        });

    }

    /**
     * Handler for the button graph selection.
     * @param {*} value 
     */
    changeGraph(value) {
        this.setState({ graphType: value })
    }

    getGraphDatas() {
        let popularGames, ratingSalesGames, leastGames = []


        popularGames = [].concat(this.state.games)
            .sort((a, b) => a.globalsales < b.globalsales).slice(0, 10);

        ratingSalesGames = [].concat(this.state.games)
            .map(x => { return ({ criticscore: x.criticscore, globalsales: x.globalsales }) }).slice(0, 100);

        leastGames = [].concat(this.state.games)
            .sort((a, b) => a.globalsales > b.globalsales).slice(0, 10);


        this.setState({ graphData: { popularGames: this.getGraphDataFormat(popularGames), ratingSalesGames: ratingSalesGames, leastGames: this.getGraphDataFormat(leastGames) } })

    }

    getGraphDataFormat(gamesArray) {
        let dataArray = [];

        for (let game of gamesArray) {
            dataArray.push({ x: game.name, y: game.globalsales, id: game._id });
        }
        return dataArray;
    }


    changeState(value) {
        this.setState({ graphType: value })
    }

    render() {
        return (
            <Grid >
                <Grid.Col span={12} justify="center" align="center">
                    <SegmentedControl 
                        data={[
                            { label: 'Most Sold', value: 'Sold-Most' },
                            { label: 'Most Popular Category', value: 'Category-Most' },
                            { label: 'Least Sold', value: 'Sold-Least' },
                        ]}
                        onChange={(value) => this.changeGraph(value)}
                    />

                </Grid.Col>

                <Grid.Col>
                    <GraphController states={this.state} />
                </Grid.Col>
            </Grid>
        )
    }

}

export default GraphDash;