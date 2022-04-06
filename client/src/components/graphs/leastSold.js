import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {
    XAxis,
    YAxis,
    FlexibleXYPlot,
    VerticalBarSeries,
    ChartLabel
} from 'react-vis';
/**
 * Least sold games graph 
 */

class LeastSold extends Component {

    render() {

        return (
            <FlexibleXYPlot margin={{ top: 25 }} xType="ordinal">
                <VerticalBarSeries
                    opacity="0.5"
                    color='#eab308'
                    data={this.props.leastGames}

                    onValueClick={(datapoint, event) => {
                        this.props.changeId(datapoint.id);
                    }}
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

            </FlexibleXYPlot>
        );
    }
}

export default LeastSold;