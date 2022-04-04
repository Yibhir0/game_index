import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {Grid} from '@mantine/core'
import {
    FlexibleXYPlot,
    ChartLabel,
    VerticalBarSeries,
    DiscreteColorLegend,
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
        
    let leastGames = []
      .concat(this.state.gamesInPage.reverse())
      .sort((a, b) => a.globalSales > b.globalSales)
      .slice(0, 10);

        this.setState({
            popularGames: this.getGraphDataFormat(popularGames),
            leastGames: this.getGraphDataFormat(leastGames),

        });


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
                        <XYPlot margin={{ top: 25 }} xType="ordinal"
                            height={300}
                            width={600}
                        >
                    <VerticalBarSeries
                        data={this.state.popularGames}
                        // onValueMouseOver={(datapoint, { event }) => {
                        //     this.setState({ crossValue: datapoint })
                        // }}
                    // onValueMouseOut={this.setState({crossValue:[]})} This causes the graph to not render, idk why yet?
                    />
                    <XAxis tickLabelAngle={90} style={{ line: { stroke: 'black' }, text:{fill:'black'}}}
                        tickSize={1}
                        tickPadding={-20}

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
                
                </XYPlot>
                    </Grid.Col>
                   
                    <Grid.Col span={6}>
                    <FlexibleXYPlot margin={{ top: 25 }} xType="ordinal">
                    <VerticalBarSeries
                        data={this.state.leastGames}
                        // onValueMouseOver={(datapoint, { event }) => {
                        //     this.setState({ crossValue: datapoint })
                        // }}
                    // onValueMouseOut={this.setState({crossValue:[]})} This causes the graph to not render, idk why yet?
                    />
                    <XAxis tickLabelAngle={90} style={{ line: { stroke: 'black' }, text:{fill:'black'}}}
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
                    <Grid.Col span={12}>
                    <FlexibleXYPlot
          xType="ordinal"
          stackBy="y"
          width={600}
          height={300}
        >
          <DiscreteColorLegend
            style={{position: 'absolute', left: '50px', top: '10px'}}
            orientation="horizontal"
            items={[
              {
                title: 'NA Sales',
                color: '#1241AB'
              },
              {
                title: 'EU Sales',
                color: '#708CCD'
                },
                {
                title: 'JP Sales',
                color: '#D2D9EF'
                }
            ]}
          />
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries
            cluster="game"
            color="#1241AB"
            data={[
              {x: 'Q1', y: 10},
              {x: 'Q2', y: 5},
              {x: 'Q3', y: 15},
              {x: 'Q4', y: 20}
            ]}
          />
          <VerticalBarSeries
            cluster="game"
            color="#708CCD"
            data={[
              {x: 'Q1', y: 3},
              {x: 'Q2', y: 7},
              {x: 'Q3', y: 2},
              {x: 'Q4', y: 1}
            ]}
          />
          <VerticalBarSeries
            cluster="game"
            color="#D2D9EF"
            data={[
              {x: 'Q1', y: 3},
              {x: 'Q2', y: 8},
              {x: 'Q3', y: 11},
              {x: 'Q4', y: 19}
            ]}
          />
        </FlexibleXYPlot>
                </Grid.Col> 
            </Grid>
            </div>
        );
    }
}

export default SearchGraphs;
