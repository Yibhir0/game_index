import React, { Component } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import { Grid } from "@mantine/core";
import {
    FlexibleXYPlot,
    ChartLabel,
    VerticalBarSeries,
    DiscreteColorLegend,
    XYPlot,
    XAxis,
    YAxis,
    RadialChart,
} from "react-vis";

/**
 * This component hold the three dynamic graphs which take the games in the search bar as data.
 * It displays a bar graph with the sorted games (most sold)
 * It displays a clustered bar graph with the games total sales grouped by region
 * It diplays a piechart with the games genres as data
 */
class SearchGraphs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gamesInPage: props.gamesInPage, // A list containg the games in the search result page
            popularGames: [], // List containing most popular games
            clusterGames: [], // List containing games and their sales relative to their region
            pieGames: [], // List containing the games and their genre
            piePercentage: [], // List to hold the genres and their respective percentage.
        };
    }

    componentDidMount() {
        this.arrangeGraphData();
    }

    /**
     * Sorts and arranges the graph data in their respective states for use in the React-vis graphs
     */
    arrangeGraphData() {

        // Sort games by popularity (Most sold) and keep first 10
        let popularGames = []
            .concat(this.state.gamesInPage)
            .sort((a, b) => a.globalSales < b.globalSales)
            .slice(0, 10);

        // Sort games by least popular (least sold) and keep first 10
        let leastGames = []
            .concat(this.state.gamesInPage.reverse())
            .sort((a, b) => a.globalSales > b.globalSales)
            .slice(0, 10);

        this.setState({
            popularGames: this.getGraphDataFormat(popularGames),
            leastGames: this.getGraphDataFormat(leastGames),
            clusterGames: this.getClusterDataFormat(this.state.gamesInPage),
            pieGames: this.getRadialDataFormat(this.state.gamesInPage),
        });
    }

    /**
     * Arranges and sorts the data properly in order to use in the piechart
     * @param {*} gamesArray 
     * @returns React-vis compatible list to be used and data for the pie chart
     */
    getRadialDataFormat(gamesArray) {
        let genreCount = {};
        let formatedForChartGenreCount = [];
        let totalGameSales = 0;

        // Loop through each game and associate the genre with their globalsales.
        for (let game of gamesArray) {
            // If the genre does not exist, declare the genre in the object and the current games globalsales.
            if (!(game.genre in genreCount)) {
                genreCount[game.genre] = game.globalSales;
            }
            // If it does exist, then add the current global sales to the current genre.
            else {
                genreCount[game.genre] += game.globalSales;
            }
            totalGameSales += game.globalSales;
        }

        // Loop throught the newly created object and format it into a React-vis (piechart) appropriate Object.
        for (const [gameGenre, totalGameGlobalSales] of Object.entries(genreCount)) {

            let piePercentage = Math.round(totalGameGlobalSales * 100 / totalGameSales) // Calculate the percentage of the current genre

            // Push a formatted object into the list.
            formatedForChartGenreCount.push({
                angle: totalGameGlobalSales,
                label: gameGenre + " " + piePercentage + "%",
            });
        }

        return formatedForChartGenreCount;
    }

    /**
     * Arranges and sorts the data properly in order to use in the cluster bar graph
     * @param {*} gamesArray 
     * @returns 
     */
    getClusterDataFormat(gamesArray) {
        let clusterArray = [];
        let jpArray = [];
        let naArray = [];
        let euArray = [];
        let otherArray = [];

        // Format data for North American portion of the cluster
        for (let game of gamesArray) {
            naArray.push({ x: game.name, y: game.naSales });
        }

        // Format data for European portion of the cluste
        for (let game of gamesArray) {
            euArray.push({ x: game.name, y: game.euSales });
        }

        // Format data for Japanese portion of the cluster
        for (let game of gamesArray) {
            jpArray.push({ x: game.name, y: game.jpSales });
        }

        // Format data for Other portion of the cluster
        for (let game of gamesArray) {
            otherArray.push({ x: game.name, y: game.otherSales });
        }

        // Push all the formatted arrays into the clusterArray
        clusterArray.push(naArray, euArray, jpArray, otherArray);

        return clusterArray;
    }
  /**
   * Format the data passed to a React-vis compatible object.
   * @param {list} gamesArray 
   * @returns 
   */
    getGraphDataFormat(gamesArray) {
        let dataArray = [];

        // For each game in the list, create an object with keys: (x,y) and values:(name, globalsales)
        // Then push object into array
        for (let game of gamesArray) {
            dataArray.push({ x: game.name, y: game.globalSales, id: game._id });
        }

        return dataArray;
    }

    render() {
        return (
            <div className="App">
                <Grid>
                    <Grid.Col span={12}>
                    <ChartLabel
                        text="Global Sales of Top 10 Games in Current List"

                        includeMargin={false}
                        xPercent={0.25}
                        yPercent={0.55}
                        style={{
                            textAnchor: "end",
                        }}
                    />
                        <XYPlot
                            margin={{ top: 25 }}
                            xType="ordinal"
                            height={300}
                            width={600}
                        >
                            <VerticalBarSeries opacity="0.5" color="#fde047" data={this.state.popularGames} />
                            <XAxis
                                tickLabelAngle={90}
                                style={{
                                    line: { stroke: "white" },
                                    text: { fill: "white" },
                                }}
                                tickSize={1}
                                tickPadding={-20}
                            />
                            <YAxis
                                style={{
                                    line: { stroke: "white" },
                                    text: { fill: "white" },
                                }}
                                tickSize={1}
                                tickPadding={2}
                                tickFormat={(v) => v / 1000000}
                            />
                            <ChartLabel
                                text="Global Sales (Millions)"
                                includeMargin={false}
                                xPercent={0.25}
                                yPercent={0.035}
                                style={{
                                    textAnchor: "end",
                                }}
                            />
                            <ChartLabel
                                text="Game"
                                includeMargin={false}
                                xPercent={1}
                                yPercent={1.155}
                                style={{
                                    textAnchor: "end",
                                }}
                            />
                        </XYPlot>
                    </Grid.Col>

                    <Grid.Col span={12}>
                    <ChartLabel
                        text="Sales Relative to Region"
                        includeMargin={false}
                        xPercent={0.25}
                        yPercent={0.55}
                        style={{
                            textAnchor: "end",
                        }}
                    />
                        <FlexibleXYPlot
                            xType="ordinal"
                            stackBy="y"
                            width={600}
                            height={300}
                        >
                            <DiscreteColorLegend
                                style={{
                                    position: "absolute",
                                    left: "100px",
                                    top: "10px",
                                }}
                                orientation="horizontal"
                                items={[
                                    {
                                        title: "NA Sales",
                                        color: "#fca5a5",
                                    },
                                    {
                                        title: "EU Sales",
                                        color: "#fdba74",
                                    },
                                    {
                                        title: "JP Sales",
                                        color: "#fef08a",
                                    },
                                    {
                                        title: "Other Sales",
                                        color: "#d9f99d",
                                    },
                                ]}
                            />

                            <YAxis
                                tickSize={1}
                                tickPadding={2}
                                tickFormat={(v) => v / 1000000}
                                style={{
                                    line: { stroke: "white" },
                                    text: { fill: "white" },
                                }}
                            />
                            <VerticalBarSeries
                                cluster="game"
                                opacity="0.6"
                                color="#fca5a5"
                                data={this.state.clusterGames[0]}
                            />
                            <XAxis
                                tickLabelAngle={90}
                                style={{
                                    line: { stroke: "white" },
                                    text: { fill: "white" },
                                }}
                                tickSize={1}
                                tickPadding={-50}
                            />
                            <VerticalBarSeries
                                cluster="game"
                                opacity="0.6"
                                color="#fdba74"
                                data={this.state.clusterGames[1]}
                            />
                            <VerticalBarSeries
                                cluster="game"
                                opacity="0.6"
                                color="#fef08a"
                                data={this.state.clusterGames[2]}
                            />
                            <VerticalBarSeries
                                cluster="game"
                                opacity="0.6"
                                color="#d9f99d"
                                data={this.state.clusterGames[3]}
                            />
                            <XAxis
                                tickLabelAngle={90}
                                style={{
                                    line: { stroke: "white" },
                                    text: { fill: "white" },
                                }}
                                tickSize={1}
                                tickPadding={-50}
                            />
                            <ChartLabel
                                text="Game"
                                includeMargin={false}
                                xPercent={1}
                                yPercent={1.155}
                                style={{
                                    textAnchor: "end",
                                }}
                            />
                            <ChartLabel
                                text="Global Sales (Millions)"
                                includeMargin={false}
                                xPercent={0.25}
                                yPercent={0.035}
                                style={{
                                    textAnchor: "end",
                                }}
                            />
                        </FlexibleXYPlot>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <ChartLabel
                                text="Sales Relative to Genre"
                                includeMargin={false}
                                xPercent={0.25}
                                yPercent={0.55}
                                style={{
                                    textAnchor: "end",
                                }}
                            />
                        <RadialChart
                            opacity="0.5"
                            colorRange={[ "#fca5a5", "#fdba74", "#fde047", "#bef264", "#5eead4", "#93c5fd"]}
                            data={this.state.pieGames}
                            width={600}
                            height={300}
                            showLabels
                            labelsStyle={{fill:"white", fontSize:"14"}}
                            margin={{left: 40, right: 40, top: 10, bottom: 10}}
                        />
                    </Grid.Col>
                </Grid>
            </div>
        );
    }
}

export default SearchGraphs;

