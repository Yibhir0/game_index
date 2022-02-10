import { Component } from "react";
import Game from './game';

class Games extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gamesL: [],
        };

    }

    async componentDidMount() {
        await this.fetchGames();
    }

    async fetchGames() {
        let gameUrl = "http://localhost:3001/games";
        let response = await fetch(gameUrl);
        console.log(response);
        let games = await response.json();
        this.setState({
            gamesL: games
        });
    }


    render() {

        return (

            <section >
                {this.state.gamesL.map((game, index) => <Game obj={game} key={index} />)}
            </section>
        );

    }


}

export default Games;

