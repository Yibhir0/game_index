import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {
    XAxis,
    YAxis,
    FlexibleXYPlot,
    XYPlot,
    MarkSeries,
    ContourSeries,
    ChartLabel,
    Borders,
} from 'react-vis';

class RatingSales extends Component {

    render() {

        return (
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
                colorRange={['#79C7E3', '#FF9833']}
                data={this.props.ratingSalesGames}
            />
                <MarkSeries onValueClick={(datapoint, event) => {
                    this.props.changeId(datapoint.id);
                }}
                data={this.props.ratingSalesGames} size={2} color={'#125C77'} />
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
        </XYPlot>

        );
    }
}

export default RatingSales;