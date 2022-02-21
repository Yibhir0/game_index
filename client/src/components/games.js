import { Component, useState } from "react";
import Game from './game';
import TopNav from "./topnav";
import {
    TextInput,
    Table,
    Anchor,
    Pagination,
    Button
} from '@mantine/core';
import { Link } from 'react-router-dom';

class Games extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gamesL: [],
            keywords: ''
        };
        
        this.searchKeyword = this.searchKeyword.bind(this);
    }

    async componentDidMount() {
        await this.fetchGames();
        this.generateRows();
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

    searchKeyword() {
        this.fetchGames();
        this.setState({
            gamesL: this.state.gamesL.filter(game => game.name.toLowerCase().includes(this.state.keywords.toLowerCase()))
        }, () => {
            this.generateRows();
        });
        
        // console.log(this.state.gamesL);
        //this.generateRows();
    }

    //Generates rows for the games in the list
    async generateRows() {
        const rows = this.state.gamesL.map((game, index) => (
            <tr key={index}>
                <td>{index}</td>
                <td><Anchor component={Link} to={`/games/${game.id}`}>{game.name}</Anchor></td>
                <td>{game.genre}</td>
                <td>{game.platform}</td>
                <td>{game.publisher}</td>
                <td>{game.year}</td>
            </tr>
        ));

        this.setState({rows: rows});
    }

    updateKeywords(evt) {
        const val = evt.target.value;
        this.setState({
            keywords: val
        })
    }

    render() {
        return (
            <>
                <TextInput
                    onChange={evt => this.updateKeywords(evt)}
                    placeholder="Keywords"
                    label="Search:"
                    description="Find a game by looking them up."
                    variant="filled"
                    radius="lg"
                    size="md"
                />
                <Button onClick={this.searchKeyword}>
                    Search
                </Button>
                <Table verticalSpacing="md" striped highlightOnHover>
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

