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

class SearchGraphs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gamesInPage: props.gamesInPage,
            popularGames: [],
            clusterGames: [],
            pieGames: [],
            piePercentage: [],
        };
    }

    componentDidMount() {
        this.arrangeGraphData();
    }

    arrangeGraphData() {
        let popularGames = []
            .concat(this.state.gamesInPage)
            .sort((a, b) => a.globalSales < b.globalSales)
            .slice(0, 10);

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

        console.log(this.state.clusterGames);
        console.log(this.state.pieGames);
    }

    getRadialDataFormat(gamesArray) {
        let genreCount = {};
        let formatedForChartGenreCount = [];
        let totalGameSales = 0;

        for (let game of gamesArray) {
            if (!(game.genre in genreCount)) {
                genreCount[game.genre] = game.globalSales;
            } else {
                genreCount[game.genre] += game.globalSales;
            }
            totalGameSales += game.globalSales;
        }

        for (const [gameGenre, totalGameGlobalSales] of Object.entries(genreCount)) {
            let piePercentage = Math.round(totalGameGlobalSales * 100 / totalGameSales)
            formatedForChartGenreCount.push({
                angle: totalGameGlobalSales,
                label: gameGenre + " " + piePercentage + "%",
            });
        }

        return formatedForChartGenreCount;
    }

    getClusterDataFormat(gamesArray) {
        let clusterArray = [];
        let jpArray = [];
        let naArray = [];
        let euArray = [];
        let otherArray = [];

        for (let game of gamesArray) {
            naArray.push({ x: game.name, y: game.naSales });
        }

        for (let game of gamesArray) {
            euArray.push({ x: game.name, y: game.euSales });
        }

        for (let game of gamesArray) {
            jpArray.push({ x: game.name, y: game.jpSales });
        }

        for (let game of gamesArray) {
            otherArray.push({ x: game.name, y: game.otherSales });
        }

        clusterArray.push(naArray, euArray, jpArray, otherArray);

        return clusterArray;
    }

    getGraphDataFormat(gamesArray) {
        let dataArray = [];

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

