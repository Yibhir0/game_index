import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    ChartLabel
} from 'react-vis';

/**
 * This component contains the React-vis graph displayed in the game page.
 * It displays a bar graph with the user ratings.
 */
class RatingGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ratings: []
        }
    }

    componentDidMount() {

        this.buildState(this.props.allFeedback)

    }

    /**
     * Counts the number of each user rating from the list and formats it to a React-vis compatible list.
     * @param {Object} result 
     */
    buildState(result) {

        let data = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }];

        // Counts the user ratings in the games and adds them to the data list of Objects.
        for (const e of result) {
            data[e.rating].y = data[e.rating].y + 1
        }
        // Sets the data onto the data.
        this.setState({ ratings: data })
    }

    render() {

        return (
            <div className="App">
                <XYPlot width={300} height={300} stackBy="y">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <ChartLabel
                        text="Users"
                        className="alt-y-label"
                        includeMargin={false}
                        xPercent={0.09}
                        yPercent={0.035}
                        style={{
                            textAnchor: 'end'
                        }}
                    />
                    <ChartLabel
                        text="Rating"
                        className="alt-x-label"
                        includeMargin={false}
                        xPercent={1}
                        yPercent={1.2}
                        style={{
                            textAnchor: 'end'
                        }}
                    />
                    <VerticalBarSeries color="#eab308" data={this.state.ratings} />
                </XYPlot>
            </div>
        );
    }
}

export default RatingGraph;
