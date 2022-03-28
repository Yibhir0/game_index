import { Component, useState } from "react";
import {
    Text,
    Accordion,
    Avatar,
    Title,
    Loader,
    SimpleGrid,
    Radio,
    RadioGroup,
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
import SearchPopUp from "../graphs/searchPopUp";

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

        this.platforms = [
            { value: '', label: 'All' },
            { value: '3DS', label: 'Nintendo 3DS' },
            { value: 'PS', label: 'PlayStation' },
            { value: 'XOne', label: 'Xbox One' },
            { value: 'GBA', label: 'Game Boy Advanced' },
            { value: 'SAT', label: 'Sega Saturn' },
            { value: 'N64', label: 'Nintendo 64' },
            { value: 'PS2', label: 'PlayStation 2' },
            { value: 'DS', label: 'Nintendo DS' },
            { value: 'PS4', label: 'PlayStation 4' },
            { value: 'PS3', label: 'PlayStation 3' },
            { value: '2600', label: 'Atari 2600' },
            { value: 'WiiU', label: 'Wii U' },
            { value: 'GB', label: 'Game Boy' },
            { value: 'GC', label: 'GameCube' },
            { value: 'WS', label: 'WonderSwan' },
            { value: 'PCFX', label: 'PC-FX' },
            { value: 'XB', label: 'Xbox' },
            { value: 'PSP', label: 'PlayStation Portable' },
            { value: 'SNES', label: 'Super Nintendo Entertainment System' },
            { value: 'GEN', label: 'Sega Genesis' },
            { value: 'PSV', label: 'PlayStation Vita' },
            { value: 'PC', label: 'Computer' },
            { value: 'SCD', label: 'Sega CD' },
            { value: 'Wii', label: 'Wii' },
            { value: 'NG', label: 'Neo Geo' },
            { value: 'NES', label: 'Nintendo Entertainment System' },
            { value: 'X360', label: 'Xbox 360' },
            { value: '3DO', label: '3DO Interactive Multiplayer' },
            { value: 'DC', label: 'Dreamcast' },
        ];

        this.state = {
            loading: true,
            gamesL: [], //contains all the games for the current list, will be changed every time a new query is made
            previousL: [], //contains all the games for the previous list, used to revert sorting
            pageNumber: 1, //current page
            gamesPerPage: 10, //number of games to display per page
            filters: {
                toggle: false, //decides whether to do a filtered search or not
                keywords: '', //keywords for the search feature, can represent the name, genre, publisher, etc
                year: '', //year the game has been released
                publisher: '',//publisher of the video game
                genre: '',//genre for the video game
                platform: '',//platform for the video game
            },
            sort: "none",
            ordering: [-1, 1],

        };

        this.search = this.search.bind(this);
        this.sortGames = this.sortGames.bind(this);
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
        this.setState({
            loading: true
        });
        //fetch all games
        console.log("game fetched");
        let gameUrl = "/games-";
        let response = await fetch(gameUrl);
        console.log(response);
        let games = await response.json();
        this.setState({
            gamesL: games,
            previousL: games
        });
    }

    async fetchGamesByFilter() {
        this.setState({
            loading: true
        });
        //fetch all games by filters
        console.log("game fetched by filters");
        let gameUrl = "/games/filter?" +
            "keywords=" + this.state.filters.keywords +
            "&year=" + this.state.filters.year +
            "&publisher=" + this.state.filters.publisher +
            "&genre=" + this.state.filters.genre +
            "&platform=" + this.state.filters.platform;
        let response = await fetch(gameUrl);
        console.log(response);
        let games = await response.json();
        this.setState({
            gamesL: games,
            previousL: games
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

    sortGames() {
        //sort by global sales
        if (this.state.sort === "gs") {
            const sortedGames = [].concat(this.state.gamesL)
                .sort((a, b) => a.globalSales > b.globalSales ? this.state.ordering[0] : this.state.ordering[1]);
            this.setState({
                pageNumber: 1,
                gamesL: sortedGames,
            }, () => {
                this.generateRows();
            })
            //sort by critic score
        } else if (this.state.sort === "cs") {
            const sortedGames = [].concat(this.state.gamesL)
                .sort((a, b) => a.criticScore > b.criticScore ? this.state.ordering[0] : this.state.ordering[1]);
            this.setState({
                pageNumber: 1,
                gamesL: sortedGames,
            }, () => {
                this.generateRows();
            })
            //remove sorting
        } else {
            this.setState({
                pageNumber: 1,
                gamesL: this.state.previousL,
            }, () => {
                this.generateRows();
            })
        }
    }

    //Generates rows for the games in the list
    async generateRows() {
        console.log(this.state.gamesL);
        const rows = this.state.gamesL.map((game, index) => (
            <tr className="bg-gradient-to-b from-gray-400 to-stone-100" key={index}>
                <td>{index}</td>
                <td><Avatar src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/${game.image_URL[0]}`} size="lg" /></td>
                <td><Anchor component={Link} to={`/games/${game._id}`}  >{game.name}</Anchor></td>
                <td>{game.genre}</td>
                <td>{game.platform.map((platform, index) => (<Text key={index}>{platform}</Text>))}</td>
                <td>{game.publisher}</td>
                <td>{game.year}</td>
                <td>{game.globalSales}</td>
                <td>{game.criticScore}</td>
            </tr>
        ));
        this.setState({
            rows: rows.slice(((this.state.pageNumber - 1) * 10), this.state.pageNumber * 10),
            loading: false
        });
    }

    //update current keyword value
    updateKeywords(evt) {
        const filters = { ...this.state.filters }
        filters.keywords = evt.target.value;
        this.setState({ filters })
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

        this.setState({ filters })
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
    updatePlatform(evt) {
        const filters = { ...this.state.filters }
        filters.platform = evt.target.value;
        filters.toggle = true;
        this.setState({ filters });
    }
    updateSort(evt) {
        this.setState({
            sort: evt
        })
    }

    updateOrdering(evt) {
        if (evt.target.value === 'desc') {
            this.setState({
                ordering: [-1, 1]
            }, () => {
                console.log(this.state.ordering);
            })
        } else if (evt.target.value === 'asc') {
            this.setState({
                ordering: [1, -1]
            }, () => {
                console.log(this.state.ordering);
            })
        }

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
        console.log("Genre value: " + this.state.filters.genre);
        console.log("Platform value: " + this.state.filters.platform);
    }
    render() {

        return (
            <>
                <SimpleGrid cols={3}>
                    <Grid.Col span={4}>
                        <TextInput
                            onChange={evt => this.updateKeywords(evt)}
                            placeholder="Keywords"
                            label="Search:"
                            description="Find a game by looking them up."
                            variant="filled"
                            radius="lg"
                            size="md"
                        />
                        <br></br>
                        <Button onClick={this.search}>
                            Search
                        </Button>
                        <SearchPopUp games={"bruh"}/>
                        
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Accordion>
                            <Accordion.Item label="Filter">
                                <SimpleGrid cols={2}>
                                    <Grid.Col span={4}>
                                        <TextInput
                                            onChange={evt => this.updatePublisher(evt)}
                                            placeholder="Publisher name"
                                            label="Publisher:"
                                            description="Search for Publisher name."
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        <NumberInput
                                            onChange={evt => this.updateYear(evt)}
                                            placeholder="Year Released"
                                            label="Year Released"
                                            description="Filter by Year Released"
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
                                    <Grid.Col span={4}>
                                        <NativeSelect
                                            onChange={evt => this.updatePlatform(evt)}
                                            data={this.platforms}
                                            label="Platform"
                                            placeholder="Select a Platform"
                                            description="Search by Platform"
                                        />
                                    </Grid.Col>
                                </SimpleGrid>
                            </Accordion.Item>
                        </Accordion>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Accordion>
                            <Accordion.Item label="Sort">
                                <RadioGroup
                                    onChange={evt => this.updateSort(evt)}
                                    defaultValue="none"
                                    label="Sort by:"
                                    description="Pick a field to sort the games"
                                >
                                    <Radio value="none">Default</Radio>
                                    <Radio value="gs">Global Sales</Radio>
                                    <Radio value="cs">Critic Score</Radio>
                                </RadioGroup>
                                <NativeSelect
                                    onChange={evt => this.updateOrdering(evt)}
                                    defaultValue="desc"
                                    label="Order by:"
                                    placeholder="Select order"
                                    data={[
                                        { value: 'desc', label: 'Descending' },
                                        { value: 'asc', label: 'Ascending' },
                                    ]}
                                />
                                <br></br>
                                <Button onClick={this.sortGames}>
                                    Sort
                                </Button>
                            </Accordion.Item>
                        </Accordion>
                    </Grid.Col>
                </SimpleGrid>

                {this.state.loading ?
                    <div style={{ margin: 'auto', padding: 50 }}>
                        <Title order={3}>Fetching All Games</Title>
                        <Loader size="xl" />
                    </div>
                    :
                    <div>
                        <Table verticalSpacing="md" striped highlightOnHover>
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Cover</th>
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
                    </div>}
            </>
        );
    }
}


export default Games;

