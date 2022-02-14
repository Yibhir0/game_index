import { Component } from "react";
import Game from './game';
import TopNav from "./topnav";
import { Table } from '@mantine/core';

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
        const rows = list.map((game, index) => (
            <tr key={index}>
                <td>{index}</td>
                <td>{game.name}</td>
                <td>{game.genre}</td>
                <td>{game.platform}</td>
                <td>{game.publisher}</td>
                <td>{game.year}</td>
            </tr>
        ));
        return (
            <>
                <Table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Genre</th>
                            <th>Platform</th>
                            <th>Publisher</th>
                            <th>Year Released</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </>
        );
    }
}

export default Games;

