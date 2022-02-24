import { Component, useState } from "react";
import {
    Grid,
    NumberInput,
    TextInput,
    Table,
    Anchor,
    Pagination,
    Button,
    NativeSelect
} from '@mantine/core';
import { Link } from 'react-router-dom';

class Games extends Component {

    constructor(props) {
        super(props);
        this.genres = [
            { value: '', label: 'All' },
            { value: 'shooter', label: 'Shooter' },
            { value: 'fighting', label: 'Fighting' },
            { value: 'action', label: 'Action' },
            { value: 'adventure', label: 'Adventure' },
            { value: 'platform', label: 'Platform' },
            { value: 'misc', label: 'Misc' },
            { value: 'mmo', label: 'MMO' },
            { value: 'visual novel', label: 'Visual Novel' },
            { value: 'puzzle', label: 'Puzzle' },
            { value: 'party', label: 'Party' },
            { value: 'simulation', label: 'Simulation' },
            { value: 'music', label: 'Music' },
            { value: 'role-playing', label: 'Role-Playing' },
            { value: 'strategy', label: 'Strategy' },
            { value: 'racing', label: 'Racing' },
            { value: 'action-adventure', label: 'Action-Adventure' },
            { value: 'sports', label: 'Sports' },

        ];
        this.state = {
            gamesL: [], //contains all the games for the current list, will be changed every time a new query is made
            pageNumber: 1, //current page
            gamesPerPage: 10, //number of games to display per page
            filters: {
                toggle: false, //decides whether to do a filtered search or not
                keywords: '', //keywords for the search feature, can represent the name, genre, publisher, etc
                year: '', //year the game has been released
                publisher: '',//publisher of the video game
                genre: '',
            },

        };
        
        this.search = this.search.bind(this);
        this.generateRows = this.generateRows.bind(this);
        this.changePage = this.changePage.bind(this);
        this.setupPagination = this.setupPagination.bind(this);
        this.printFilters = this.printFilters.bind(this);
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

    async fetchGamesByFilter() {
        //fetch all games by filters
        console.log("game fetched by filters");
        let gameUrl = "/games/filter?" +
            "keywords=" + this.state.filters.keywords +
            "&year=" + this.state.filters.year +
            "&publisher=" + this.state.filters.publisher +
            "&genre=" + this.state.filters.genre;
        let response = await fetch(gameUrl);
        console.log(response);
        let games = await response.json();
        this.setState({
            gamesL: games
        });
    }


    async search() {
        //verifies if the keywords are empty or not
        if (this.state.filters.keywords === "" || this.state.filters.keywords.trim().length === 0) {
            //verifies if any keyword in publisher field, if there is then fetch games by filter
            if (this.state.filters.publisher === "" || this.state.filters.publisher.trim().length === 0) {
                //if filter toggle is on, then it will do a filtered search with no keywords
                //this means that the user has toggled a filtered search by inputting a year of release value
                //or selecting a genre
                if (this.state.filters.toggle === true) {
                    await this.fetchGamesByFilter();
                } else {
                    await this.fetchGames();
                }
            } else {
                await this.fetchGamesByFilter();
            }
        //if not empty, then assumes the search bar has keywords, which will end up doing a filtered search
        } else {
            await this.fetchGamesByFilter();
        }

        this.setState({
            pageNumber: 1,
        }, () => {
            this.printFilters();
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
                <td><Anchor component={Link} to={`/games/${game._id}`}  >{game.name}</Anchor></td>
                <td>{game.genre}</td>
                <td>{game.platform}</td>
                <td>{game.publisher}</td>
                <td>{game.year}</td>
                <td>{game.globalsales}</td>
                <td>{game.criticscore}</td>
            </tr>
        ));
        this.setState({rows: rows.slice(((this.state.pageNumber-1)*10),this.state.pageNumber*10)});
    }

    //update current keyword value
    updateKeywords(evt) {
        const filters = { ...this.state.filters }
        filters.keywords = evt.target.value;
        this.setState({filters})
    }

    //update current year value
    updateYear(evt) {
        const filters = { ...this.state.filters }
        filters.toggle = true;
        if (evt === undefined) {
            filters.year = '';
        } else {
            filters.year = evt;
        }
        
        this.setState({filters})
    }

    updatePublisher(evt) {
        const filters = { ...this.state.filters }
        filters.publisher = evt.target.value;
        this.setState({ filters });
    }

    updateGenre(evt) {
        const filters = { ...this.state.filters }
        filters.genre = evt.target.value;
        filters.toggle = true;
        this.setState({ filters });
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

    //print the current state of the filter
    printFilters() {
        console.log("Filter toggle: " + this.state.filters.toggle);
        console.log("Keyword value: " + this.state.filters.keywords);
        console.log("Year value: " + this.state.filters.year);
        console.log("Publisher value: " + this.state.filters.publisher);
    }
    render() {
        
        return (
            <>
                <Grid>
                    <Grid.Col span={4}>
                        <NumberInput
                            onChange={evt => this.updateYear(evt)}
                            placeholder="Year Released"
                            label="Year Released"
                            description="Filter by Year Released"
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <TextInput
                            onChange={evt => this.updatePublisher(evt)}
                            placeholder="Publisher name"
                            label="Publisher:"
                            description="Search for Publisher name."
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <NativeSelect
                            onChange={evt => this.updateGenre(evt)}
                            data={this.genres}
                            label="Genre"
                            placeholder="Select a Genre"
                            description="Search by Genre"
                        />
                    </Grid.Col>
                    
                </Grid>
                <TextInput
                    onChange={evt => this.updateKeywords(evt)}
                    placeholder="Keywords"
                    label="Search:"
                    description="Find a game by looking them up."
                    variant="filled"
                    radius="lg"
                    size="md"
                />
                <Button onClick={this.search}>
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
                            <th>Global Sales</th>
                            <th>Critic Score</th>
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

