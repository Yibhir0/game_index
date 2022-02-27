import { Button } from "@mantine/core";
import { Component, useState } from "react";

class GraphDash extends Component{

    constructor(props) {
        super(props);

        this.state = {
            games: [],
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
        let fetchedGames = fetchResponse.json();

        this.setState({
            games: fetchedGames
        });
    }

    render() {
        return (
            <div>
                <div className="centered-and-flexed" >
                    <div className="centered-and-flexed-controls">
                        <Button> blah</Button>
                        <Button> blah</Button>
                        <Button> blah</Button>
                    </div>


                </div>
                


            </div>
        )
    }

}

export default GraphDash;