import { Component, useState } from "react";
import {ChartLabel, LineSeries, VerticalGridLines, HorizontalGridLines, FlexibleXYPlot, XAxis, YAxis, VerticalBarSeries, Hint} from 'react-vis';
import {
    Center
} from "@mantine/core";

class GraphController extends Component{

    constructor(props) {
        super(props)
            this.state = {
                crossValue: []
            }
    }

    render() {
        let graph;
        if (this.props.states.graphType === 'Sold-Most') {
            graph =
                <FlexibleXYPlot margin={{ top: 25 }} xType="ordinal">
                    <VerticalBarSeries
                        data={this.props.states.graphData.popularGames}
                        onValueMouseOver={(datapoint, { event }) => {
                            this.setState({crossValue: datapoint})
                        }}
                        onValueMouseOut={this.setState({crossValue:[]})}
                    />
                    <XAxis style={{ line: { stroke:'black'}}} />
                    <YAxis style={{ line: { stroke: 'black' } }}
                                tickSize={1}
                                tickPadding={2}
                                tickFormat={v => v / 1000000}
                        />
                    <ChartLabel
                        text="Global Sales (Millions)"
                        className="alt-y-label"
                        includeMargin={false}
                        xPercent={0.09}
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
                        yPercent={1.115}
                        style={{
                        textAnchor: 'end'
                        }}
                    />

                    <Hint value={this.state.crossValue} align={{horizontal:Hint.ALIGN.AUTO, vertical:Hint.ALIGN.BOTTOM_EDGE}}>
                        
                            <p>{this.state.crossValue.x}</p>
                            <p>{this.state.crossValue.y}</p>
                    </Hint>
                </FlexibleXYPlot>;

        }
        else {
            graph = <FlexibleXYPlot >
            <VerticalGridLines />
            <HorizontalGridLines />
            <LineSeries style={{ fill: 'none' }} color="Black" data={[
            {x: 0, y: 8},
            {x: 1, y: 5},
            {x: 2, y: 4},
            {x: 3, y: 9},
            {x: 4, y: 1},
            {x: 5, y: 7},
            {x: 6, y: 6},
            {x: 7, y: 3},
            {x: 8, y: 2},
            {x: 9, y: 0}
            ]} />
            <XAxis title="El Juego"/>
            <YAxis title = "The big Number"/>
          </FlexibleXYPlot>
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

  
