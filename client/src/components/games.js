import { Component } from "react";
import Game from './game';
import TopNav from "./topnav";
import { Table, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';

class Games extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gamesL: [],
        };
    }

    async componentDidMount() {
        await this.fetchGames();
        await this.generateRows();
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

    //Generates rows for all games
    async generateRows() {
        const rows = this.state.gamesL.map((game, index) => (
            <tr key={index}>
                <td>{index}</td>
                <td><Anchor component={Link } to={`/games/${game.id}`}>{game.name}</Anchor></td>
                <td>{game.genre}</td>
                <td>{game.platform}</td>
                <td>{game.publisher}</td>
                <td>{game.year}</td>
            </tr>
        ));

        this.setState({ rows: rows });
    }

    render() {

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
                        {this.state.rows}
                    </tbody>
                </Table>
            </>
        );
    }
}

export default Games;

