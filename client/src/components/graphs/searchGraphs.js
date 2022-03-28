import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {
    RadialChart
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
                <RadialChart
  data={[
    {
      angle: 15,
      label: 'deck.gl'
    },
    {
      angle: 25,
      label: 'math.gl'
    },
    {
      angle: 8,
      label: 'probe.gl'
    },
    {
      angle: 27,
      label: 'vis.gl'
    },
    {
      angle: 15,
      label: 'react-map-gl'
    }
  ]}
  labelsRadiusMultiplier={1.1}
  labelsStyle={{
    fontSize: 12
  }}
  showLabels
/>
            </div>
        );
    }
}

export default SearchGraphs;
