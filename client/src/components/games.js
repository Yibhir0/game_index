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
            keywords: '',
            pageNumber: 1,
            gamesPerPage: 10,
        };
        
        this.searchKeyword = this.searchKeyword.bind(this);
        this.generateRows = this.generateRows.bind(this);
        this.changePage = this.changePage.bind(this);
        this.setupPagination = this.setupPagination.bind(this);
    }

    async componentDidMount() {
        await this.fetchGames()
        this.setupPagination();
        this.generateRows();
    }

    async setupPagination() {
        this.setState({
            totalPages: Math.ceil(this.state.gamesL.length / this.state.gamesPerPage)
        }, () => {
            console.log(this.state.totalPages);
        });
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
            pageNumber: 1,
            gamesL: this.state.gamesL.filter(game => game.name.toLowerCase().includes(this.state.keywords.toLowerCase()))
        }, () => {
            this.setupPagination();
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
        this.setState({rows: rows.slice(((this.state.pageNumber-1)*10),this.state.pageNumber*10)});
    }

    updateKeywords(evt) {
        
        const val = evt.target.value;
        this.setState({
            keywords: val
        })
    }
    
    changePage(evt) {
        const page = evt;
        this.setState({
            pageNumber: page
        }, () => {
            this.generateRows();
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
                <Pagination
                    total={this.state.totalPages}
                    onChange={evt => this.changePage(evt)} />
            </>
        );
    }
}


export default Games;

