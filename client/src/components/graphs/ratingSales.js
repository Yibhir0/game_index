import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {
    XAxis,
    YAxis,
    XYPlot,
    MarkSeries,
    ContourSeries,
    ChartLabel,
    Borders,
} from 'react-vis';

import { Tooltip } from '@mantine/core';

/**
 * This component contains the React-vis graph contructed with the ratingSalesGames list from the parent component (GraphController)
 * It displays a Contour (heat) graph with the 1000 most sold games of all time, grouped by rating.
 * It maps the onto the contour map as dots.
 */
class RatingSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            gameName: '' // Name of the game 
        }
    }
    render() {

        return (
            <div>
                <XYPlot
                    height={400}
                    width={1200}
                    xDomain={[0, 17000000]}
                    getX={d => d.globalsales}
                    getY={d => d.criticscore}
                    margin={{ top: 25 }}
                >
                    <ContourSeries
                        className="contour-series-example"
                        style={{
                            stroke: '#125C77',
                            strokeLinejoin: 'round'
                        }}
                        colorRange={['#fbbf24', '#b45309']}
                        data={this.props.ratingSalesGames}
                    />
                    <MarkSeries onValueClick={(datapoint, event) => {
                        this.props.changeId(datapoint.id);

                    }}
                        onValueMouseOver={(datapoint, event) => {
                            this.setState({ opened: true, gameName: datapoint.name })
                        }}

                        onValueMouseOut={(datapoint, event) => {
                            this.setState({ opened: false, gameName: "" })
                        }}
                        data={this.props.ratingSalesGames} size={2} color={'#125C77'} />
                    <Borders style={{ all: { fill: '#18181b' } }} />
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
                </XYPlot>
                {/* ToolTip component allows for the game name to appear over dot when hovered over. */}
                <Tooltip label={this.state.gameName} opened={this.state.opened}>

                </Tooltip>
            </div>



        );
    }
}

export default RatingSales;