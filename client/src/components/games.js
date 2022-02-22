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
            gamesL: [], //contains all the games for the current list, will be changed every time a new query is made
            keywords: '', //keywords for the search feature, can represent the name, genre, publisher, etc
            pageNumber: 1, //current page
            gamesPerPage: 10, //number of games to display per page
        };
        
        this.searchKeyword = this.searchKeyword.bind(this);
        this.generateRows = this.generateRows.bind(this);
        this.changePage = this.changePage.bind(this);
        this.setupPagination = this.setupPagination.bind(this);
    }

    async componentDidMount() {
        //fetch game, then setup pagination and then generate the rows to be displayed
        await this.fetchGames()
        this.setupPagination();
        this.generateRows();
    }

    async setupPagination() {
        //sets the total number of page for pagination
        this.setState({
            totalPages: Math.ceil(this.state.gamesL.length / this.state.gamesPerPage)
        }, () => {
            console.log(this.state.totalPages);
        });
    }

    async fetchGames() {
        //fetch all games
        console.log("game fetched");
        let gameUrl = "/games";
        let response = await fetch(gameUrl);
        console.log(response);
        let games = await response.json();
        this.setState({
            gamesL: games
        });
    }

    searchKeyword() {
        //fetches all the game to reset the list and then filter based on keyword
        //will be reimplemented later to work with the backend
        //will only need to send the query when it is implemented with the backend
        this.fetchGames();
        this.setState({
            pageNumber: 1,
            gamesL: this.state.gamesL.filter(game => game.name.toLowerCase().includes(this.state.keywords.toLowerCase()))
        }, () => {
            this.setupPagination();
            this.generateRows();
        });
    }

    //Generates rows for the games in the list
    async generateRows() {
        console.log(this.state.gamesL);
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
        //updates keyword everytime a user writes in the search bar
        const val = evt.target.value;
        this.setState({
            keywords: val
        })
    }
    
    changePage(evt) {
        //if statement to prevent users from clicking on the same page button
        if (this.state.pageNumber !== evt) {
            //if user clicks on a different page number, the page number will change and then regenerate the new rows
            const page = evt;
            this.setState({
                pageNumber: page
            }, () => {
                this.generateRows();
            })
        } else {
            console.log("same page");
        }
        
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
                    page={this.state.pageNumber}
                    onChange={evt => this.changePage(evt)} />
            </>
        );
    }
}


export default Games;

