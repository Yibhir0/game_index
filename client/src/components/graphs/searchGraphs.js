import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {Grid} from '@mantine/core'
import {
    FlexibleXYPlot,
    ChartLabel,
    VerticalBarSeries,
    RadialChart,
    XYPlot,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,LineSeries
} from 'react-vis';

class SearchGraphs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gamesInPage: props.gamesInPage,
            popularGames:[],
        }
    }

    componentDidMount() {

        this.arrangeGraphData();

    }

    arrangeGraphData() {
    let popularGames = []
        .concat(this.state.gamesInPage)
        .sort((a, b) => a.globalSales < b.globalSales)
        .slice(0, 10);
        console.log("hereuhhh:  " + this.state.popularGames)
        

        this.setState({ popularGames: this.getGraphDataFormat(popularGames) });


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
                <Grid.Col span={6}>
                <FlexibleXYPlot margin={{ top: 25 }} xType="ordinal">
                    <VerticalBarSeries
                        color='green'
                        data={this.state.popularGames}
                        // onValueMouseOver={(datapoint, { event }) => {
                        //     this.setState({ crossValue: datapoint })
                        // }}
                    // onValueMouseOut={this.setState({crossValue:[]})} This causes the graph to not render, idk why yet?
                    />
                    <XAxis tickLabelAngle={90} style={{ line: { stroke: 'black' }, text:{fill:'red'}}}
                        tickSize={1}
                        tickPadding={-50}

                    />
                    <YAxis style={{ line: { stroke: 'black' } }}
                        tickSize={1}
                        tickPadding={2}
                        tickFormat={v => v / 1000000}
                    />
                    <ChartLabel
                        text="Global Sales (Millions)"
                        className="alt-y-label"
                        includeMargin={false}
                        xPercent={0.25}
                        yPercent={0.035}
                        
                        style={{
                            textAnchor: 'end'
                        }}
                    />
                    <ChartLabel
                        text="Game"
                        className="alt-x-label"
                        includeMargin={false}
                        xPercent={1}
                        yPercent={1.155}
                        style={{
                            textAnchor: 'end'
                        }}
                    />
                
                </FlexibleXYPlot>
                    </Grid.Col>
                    <Grid.Col span={6}>
                    <XYPlot height={300} width= {300}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <LineSeries data={[ {x: 0, y: 8},
                                        {x: 1, y: 5},
                                        {x: 2, y: 4},
                                        {x: 3, y: 9}]} />
                            </XYPlot>
                    </Grid.Col> 
                    <Grid.Col span={6}>
                    <XYPlot height={300} width= {300}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <LineSeries data={[ {x: 0, y: 8},
                                        {x: 1, y: 5},
                                        {x: 2, y: 4},
                                        {x: 3, y: 9}]} />
                            </XYPlot>
                    </Grid.Col>
                    <Grid.Col span={6}>
                    <XYPlot height={300} width= {300}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <LineSeries data={[ {x: 0, y: 8},
                                        {x: 1, y: 5},
                                        {x: 2, y: 4},
                                        {x: 3, y: 9}]} />
                            </XYPlot>
                    </Grid.Col> 
                    <Grid.Col span={6}>
                    <XYPlot height={300} width= {300}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <LineSeries data={[ {x: 0, y: 8},
                                        {x: 1, y: 5},
                                        {x: 2, y: 4},
                                        {x: 3, y: 9}]} />
                            </XYPlot>
                </Grid.Col> 
            </Grid>
            </div>
        );
    }
}

export default SearchGraphs;
