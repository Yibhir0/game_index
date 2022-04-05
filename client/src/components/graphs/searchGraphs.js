import React, { Component } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import { Grid } from "@mantine/core";
import {
    FlexibleXYPlot,
    ChartLabel,
    VerticalBarSeries,
    DiscreteColorLegend,
    XYPlot,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    LineSeries,
    ArcSeries,
    RadialChart
} from "react-vis";

class SearchGraphs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gamesInPage: props.gamesInPage,
            popularGames: [],
            clusterGames: [],
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
            pieGames: this.getRadialDataFormat(this.state.gamesInPage)
        });
   
    }

    getRadialDataFormat(gamesArray) {
        let genreCount = {};
        let formatedForChartGenreCount = {}

        for (let game of gamesArray) {
            if (!(game.genre in genreCount)) {
                genreCount[game.genre] = game.globalSales;
            }
            else {
                genreCount[game.genre] += game.globalSales; 
            }
        }

        for (const [key, value] of Object.entries(genreCount)) {
            console.log(key + ":" + value)
        }

        return genreCount;

        // {
        //     angle: 23,
        //     label: 'deck.gl'
        //   },

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
                        <XYPlot
                            margin={{ top: 25 }}
                            xType="ordinal"
                            height={300}
                            width={600}
                        >
                            <VerticalBarSeries data={this.state.popularGames} />
                            <XAxis
                                tickLabelAngle={90}
                                style={{
                                    line: { stroke: "black" },
                                    text: { fill: "black" },
                                }}
                                tickSize={1}
                                tickPadding={-20}
                            />
                            <YAxis
                                style={{ line: { stroke: "black" } }}
                                tickSize={1}
                                tickPadding={2}
                                tickFormat={(v) => v / 1000000}
                            />
                            <ChartLabel
                                text="Global Sales (Millions)"
                                className="alt-y-label"
                                includeMargin={false}
                                xPercent={0.25}
                                yPercent={0.035}
                                style={{
                                    textAnchor: "end",
                                }}
                            />
                            <ChartLabel
                                text="Game"
                                className="alt-x-label"
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
                                        color: "#FFDDE2FF",
                                    },
                                    {
                                        title: "EU Sales",
                                        color: "#FAA094FF",
                                    },
                                    {
                                        title: "JP Sales",
                                        color: "#9ED9CCFF",
                                    },
                                    {
                                        title: "Other Sales",
                                        color: "#008C76FF",
                                    },
                                ]}
                            />
                            <VerticalGridLines />
                            <HorizontalGridLines />

                            <YAxis
                                tickSize={1}
                                tickPadding={2}
                                tickFormat={(v) => v / 1000000}
                            />
                            <VerticalBarSeries
                                cluster="game"
                                color="#008C76FF"
                                data={this.state.clusterGames[0]}
                            />
                            <XAxis
                                tickLabelAngle={90}
                                style={{
                                    line: { stroke: "black" },
                                    text: { fill: "black" },
                                }}
                                tickSize={1}
                                tickPadding={-50}
                            />
                            <VerticalBarSeries
                                cluster="game"
                                color="#9ED9CCFF"
                                data={this.state.clusterGames[1]}
                            />
                            <VerticalBarSeries
                                cluster="game"
                                color="#FAA094FF"
                                data={this.state.clusterGames[2]}
                            />
                            <VerticalBarSeries
                                cluster="game"
                                color="#FFDDE2FF"
                                data={this.state.clusterGames[3]}
                            />
                            <XAxis
                                tickLabelAngle={90}
                                style={{
                                    line: { stroke: "black" },
                                    text: { fill: "black" },
                                }}
                                tickSize={1}
                                tickPadding={-50}
                            />
                            <ChartLabel
                                text="Game"
                                className="alt-x-label"
                                includeMargin={false}
                                xPercent={1}
                                yPercent={1.155}
                                style={{
                                    textAnchor: "end",
                                }}
                            />
                            <ChartLabel
                                text="Global Sales (Millions)"
                                className="alt-y-label"
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
                    <RadialChart
  data={[
    {
      angle: 23,
      label: 'deck.gl'
    },
    {
      angle: 30,
      label: 'math.gl'
    },
    // {
    //   angle: 17,
    //   label: 'probe.gl'
    // },
    // {
    //   angle: 18,
    //   label: 'vis.gl'
    // },
    // {
    //   angle: 34,
    //   label: 'react-map-gl'
    // }
  ]}
  width={600}
                            height={300}
                        showLabels/>
  
                    </Grid.Col>
                </Grid>
            </div>
        );
    }
}

export default SearchGraphs;

