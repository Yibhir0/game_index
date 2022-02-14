import { Component } from "react";
import Game from './game';
import TopNav from "./topnav";

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
        let gameUrl = "/games";
        let response = await fetch(gameUrl);
        console.log(response);
        let games = await response.json();
        this.setState({
            gamesL: games
        });
    }

    render() {
        const list = this.state.gamesL;
        return (
            <>
                <section >
                    {list.map((game, index) => <Game obj={game} key={index} />)}
                </section>
            </>
        );
    }
}

export default Games;

