import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {Grid} from '@mantine/core'
import {
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
            ratings: []
        }
    }

    componentDidMount() {

        // this.buildState(this.props.games)

    }

    buildState(result) {

        let data = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }];

        for (const e of result) {
            data[e.rating].y = data[e.rating].y + 1
        }

        this.setState({ ratings: data })
    }

    render() {

        return (
            <div className="App">
                <Grid>
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
