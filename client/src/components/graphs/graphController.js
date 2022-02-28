import { Component, useState } from "react";
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, FlexibleXYPlot, XAxis, YAxis, VerticalBarSeries} from 'react-vis';
import {
    Center
} from "@mantine/core";

class GraphController extends Component{

    constructor(props) {
        super(props);

        this.state = {
            games: [],
            graphType: props.type,
        };
    }
    
    async componentDidMount() {
        await this.fetchGames();
    }


/***
 * Fetches the games in the DB and adds them to the state.
 */
    async fetchGames() {
        let fetchResponse = await fetch('/games');
        let fetchedGames = await fetchResponse.json();

        this.setState({
            games: fetchedGames
        });


    }

    render() {
        let graph;
        let graph2;
        if (this.state.graphType === 'Popular') {
            graph = <FlexibleXYPlot xType = "ordinal">
            <VerticalBarSeries data={[
                    { x: 'El Juegox', y: 11.2 },
                    { x: 'New Super Mario', y: 29.2 },
                    { x: 'Nintendogs', y: 25.0 },
                    { x: 'Super Mario Land', y: 18.1 },
                    { x: 'Super Mario 64', y: 11.9 },
                    { x: 'Bears', y: 74.5 },
                    { x: 'The Legend of Zelda', y: 46.1 },
                    { x: 'F-1 Race', y: 34.1},
                    { x: 'Super Mario Maker', y: 34.5 },
                 ]} />
            <XAxis title = "Nintendo Game"/>
            <YAxis title = "Global sales"/>
            </FlexibleXYPlot>;
    
            graph2 =<FlexibleXYPlot style={{backgroundColor:"#F6BB42"}} >
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
        else {
            graph = <h1> Ya ok </h1>;
        }
        
        return (
            <div>
                <Center style={{ height: 400, textAlign: 'center' }}>
                    {graph}
                    {/* {graph2} */}
                </Center>
            </div>
        )
    }

}

export default GraphController;

  
