import { Component } from "react";
import { ChartLabel, Borders, ContourSeries, FlexibleXYPlot, XAxis, YAxis, VerticalBarSeries, Hint, MarkSeries } from 'react-vis';
import {
    Center
} from "@mantine/core";
import { Navigate } from "react-router-dom";

class GraphController extends Component {

    constructor(props) {
        super(props)
        this.state = {
            crossValue: [],
            crosshairValues: [],
            gameId: ''
        }
    }

    _onNearestX = (value, { index }) => {
        this.setState({ crosshairValues: this.props.states.graphData.ratingSalesGames[index] });
    };

    render() {
        let graph;
        if (this.props.states.graphType === 'Sold-Most') {
            graph =
                <FlexibleXYPlot margin={{ top: 25 }} xType="ordinal">
                    <VerticalBarSeries
                        data={this.props.states.graphData.popularGames}
                        onValueMouseOver={(datapoint, { event }) => {
                            this.setState({ crossValue: datapoint })
                        }}
                    // onValueMouseOut={this.setState({crossValue:[]})} This causes the graph to not render, idk why yet?
                    />
                    <XAxis style={{ line: { stroke: 'black' } }} />
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
                    {this.state.crossValue.length > 0 &&
                        < Hint value={this.state.crossValue} align={{ horizontal: Hint.ALIGN.AUTO, vertical: Hint.ALIGN.BOTTOM_EDGE }}>
                            <p>{this.state.crossValue.x}</p>
                            <p>{this.state.crossValue.y}</p>
                        </Hint>
                    }
                </FlexibleXYPlot>;

        }
        else if (this.props.states.graphType === 'Sold-Least') {

            graph =
                <FlexibleXYPlot margin={{ top: 25 }} xType="ordinal">
                    <VerticalBarSeries
                        color='pink'
                        data={this.props.states.graphData.leastGames}
                        onValueMouseOver={(datapoint, { event }) => {
                            this.setState({ crossValue: datapoint })
                        }}
                        onValueClick={(datapoint, event) => {
                            this.setState({ gameId: datapoint.id })
                        }}
                    // onValueMouseOut={this.setState({crossValue:[]})} This causes the graph to not render, idk why yet?
                    />
                    <XAxis tickLabelAngle={90} style={{ line: { stroke: 'black' }, }}
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
                    {this.state.crossValue.length > 0 &&
                        < Hint value={this.state.crossValue} align={{ horizontal: Hint.ALIGN.AUTO, vertical: Hint.ALIGN.BOTTOM_EDGE }}>
                            <p>{this.state.crossValue.x}</p>
                            <p>{this.state.crossValue.y}</p>
                        </Hint>
                    }
                </FlexibleXYPlot>;
        }
        else {
            graph =
                <FlexibleXYPlot
                    xDomain={[0, 17000000]}
                    getX={d => d.globalsales}
                    getY={d => d.criticscore}
                    margin={{ top: 25 }}
                >
                    <ContourSeries
                        animation
                        className="contour-series-example"
                        style={{
                            stroke: '#125C77',
                            strokeLinejoin: 'round'
                        }}
                        colorRange={['#79C7E3', '#FF9833']}
                        data={this.props.states.graphData.ratingSalesGames}
                    />
                    <MarkSeries onNearestX={this._onNearestX} animation data={this.props.states.graphData.ratingSalesGames} size={2} color={'#125C77'} />
                    <Borders style={{ all: { fill: '#fff' } }} />
                    <XAxis tickFormat={v => v / 1000000} style={{ line: { stroke: 'black' } }} />
                    <YAxis style={{ line: { stroke: 'black' } }} />

                    <ChartLabel
                        text="Rating"
                        className="alt-y-label"
                        includeMargin={false}
                        yPercent={0.035}
                        xPercent={0.02}
                        style={{
                            textAnchor: 'end'
                        }}
                    />
                    <ChartLabel
                        text="Unit Sales (Millions)"
                        className="alt-x-label"
                        includeMargin={false}
                        xPercent={1}
                        yPercent={1.115}
                        style={{
                            textAnchor: 'end'
                        }}
                    />
                </FlexibleXYPlot>
        }


        if (this.state.gameId) {
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


