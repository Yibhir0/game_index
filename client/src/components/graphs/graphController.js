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
    
    graph() {
        const graph = this.state.graphType;
        console.log("asdfdaf: " + graph)
        let actual = [
            { x: 'Super Mario Land 2: 6 Golden Coins', y: 11180000 },
            { x: 'New Super Mario Bros. Wii', y: 29150000 },
            { x: 'Nintendogs', y: 24490000 },
            { x: 'Super Mario Land', y: 18140000 },
            { x: 'Super Mario 64', y: 11900000 },
            { x: 'Super Mario Bros. 2', y: 7460000 },
            { x: 'The Legend of Zelda: A Link to the Past', y: 4610000 },
            { x: 'F-1 Race', y: 3410000 },
            { x: 'Super Mario Maker', y: 3453333 },
            { x: "Mike Tyson's Punch-Out!!", y: 3020000 }
        ]

        return <Center>
                    <FlexibleXYPlot xType="ordinal">
                        <VerticalBarSeries data={actual} />
                        <XAxis title="Nintendo Game" />
                        <YAxis title="Global sales" />
                    </FlexibleXYPlot>
                </Center>
    }

/***
 * Fetches the games in the DB and adds them to the state.
 */
    async fetchGames() {
        let fetchResponse = await fetch('/games');
        let fetchedGames = fetchResponse.json();

        this.setState({
            games: fetchedGames
        });

        console.log(this.state.games)
    }

    render() {
        return (
            <div>
                <Center style={{ height: 400, textAlign: 'center' }}>
                    <FlexibleXYPlot xType = "ordinal">
                            <VerticalBarSeries data={[
                                    { x: 'Super Mario Land 2: 6 Golden Coins', y: 11180000 },
                                    { x: 'New Super Mario Bros. Wii', y: 29150000 },
                                    { x: 'Nintendogs', y: 24490000 },
                                    { x: 'Super Mario Land', y: 18140000 },
                                    { x: 'Super Mario 64', y: 11900000 },
                                    { x: 'Super Mario Bros. 2', y: 7460000 },
                                    { x: 'The Legend of Zelda: A Link to the Past', y: 4610000 },
                                    { x: 'F-1 Race', y: 3410000 },
                                    { x: 'Super Mario Maker', y: 3453333 },
                                    { x: "Mike Tyson's Punch-Out!!", y: 3020000 }
                                 ]} />
                            <XAxis title = "Nintendo Game"/>
                            <YAxis title = "Global sales"/>
                    </FlexibleXYPlot>
                </Center>
            </div>
        )
    }

}

export default GraphController;

// GraphController(props) {
//     const graph = props.graphType;
//     let actual = [
//         { x: 'Super Mario Land 2: 6 Golden Coins', y: 11180000 },
//         { x: 'New Super Mario Bros. Wii', y: 29150000 },
//         { x: 'Nintendogs', y: 24490000 },
//         { x: 'Super Mario Land', y: 18140000 },
//         { x: 'Super Mario 64', y: 11900000 },
//         { x: 'Super Mario Bros. 2', y: 7460000 },
//         { x: 'The Legend of Zelda: A Link to the Past', y: 4610000 },
//         { x: 'F-1 Race', y: 3410000 },
//         { x: 'Super Mario Maker', y: 3453333 },
//         { x: "Mike Tyson's Punch-Out!!", y: 3020000 }
//       ]
//     if (graph === "Popular") {
//       return <XYPlot height={500} width={1500} xType = "ordinal">
//                 <VerticalBarSeries data={actual} />
//                 <XAxis title = "Nintendo Game"/>
//                 <YAxis title = "Global sales"/>
//             </XYPlot>;
//     }
    
// }

// ReactDOM.render(
//     // Try changing to isLoggedIn={true}:
//     <Greeting isLoggedIn={false} />,
//     document.getElementById('root')
//   );
  
