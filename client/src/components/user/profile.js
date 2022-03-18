import { Component, useState } from "react";
import {
    Loader,
    Autocomplete,
    Modal,
    Text,
    Title,
    Accordion,
    Image,
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
    NativeSelect,
    THEME_ICON_SIZES
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { off } from "process";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isGamesLoaded: false,
            gamesL: [],
            creatingList: false,
            createdListName: '',
            currentGameList: '',
            addingGame: false,
            gameToAdd: [],
            gameToBeDeleted: [],
            addGameErrorMsg: '',
            createListErrorMsg: '',
            userId: '',
            currentUser: {},
            loading: true,
            loggedIn: true,
            editPerms: false,
        };

        this.createList = this.createList.bind(this);
        this.addListToDb = this.addListToDb.bind(this);
        this.generateList = this.generateList.bind(this);
        this.fetchGames = this.fetchGames.bind(this);
        this.convertStringList = this.convertStringList.bind(this);
        this.addGameToList = this.addGameToList.bind(this);
        this.resetErrorMsg = this.resetErrorMsg.bind(this);
        this.checkDuplicates = this.checkDuplicates.bind(this);
        this.removeGameFromList = this.removeGameFromList.bind(this);
        this.checkPerms = this.checkPerms.bind(this);
        // this.updateUser = this.updateUser.bind(this);
    }

    

    async componentDidMount() {
        this.checkPerms();
        await this.fetchUser()
        this.generateList();
        await this.fetchGames();
    }

    checkPerms() {
        if (localStorage.getItem('userProfile') != null) {
            if ((JSON.parse(localStorage.getItem('userProfile')))._id === this.props.id) {
                this.setState({ editPerms: true }, () => {
                    console.log(this.state.editPerms);
                })
            } else {
                this.setState({ editPerms: false }, () => {
                    console.log(this.state.editPerms);
                })
            }
        } 
    }

    async fetchUser() {

        console.log(this.props.id);

        let url = `/users/${this.props.id}`;

        let response = await fetch(url);

        let user = await response.json();

        this.setState({
            currentUser: user,
            loading: false,
        }, () => {
            console.log(this.state.currentUser);
        })
    }

    async fetchGames() {

        //fetch all games
        console.log("game fetched");
        let gameUrl = "/games";
        let response = await fetch(gameUrl);
        console.log(response);
        let games = await response.json();
        this.setState({
            gamesL: games,
        }, () => {
            this.convertStringList();
            // console.log(this.state.gamesL);
            // console.log(this.state.isGamesLoaded);
        });
    }

    convertStringList() {
        let arr = this.state.gamesL.map((game) => (
            { value: game.name + " (" + game.platform + ")" + " (" + game.year + ")", id: game._id }
        ));
        this.setState({
            gameStrings: arr,
            isGamesLoaded: true,
        }, () => {
            console.log(this.state.gameStrings);
        })
    }

    updateAddGame(evt) {
        this.resetErrorMsg();
        let gameObject = this.state.gameStrings.filter((game) => game.value === evt);
        if (gameObject.length) {
            let gameID = gameObject[0].id;
            let gameToAdd = this.state.gamesL.filter((game) => game._id === gameID);
            this.setState({
                gameToAdd: gameToAdd
            });

        } else {
            this.setState({
                gameToAdd: []
            });
        }
    }
    generateList() {
        const lists = this.state.currentUser.lists.map((gameList) => (
            <Accordion.Item label={gameList.name}>
                <Table verticalSpacing={'xl'}>
                    <thead>
                        <tr>
                            <th>Cover</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Publisher</th>
                            <th>Year</th>
                            <th>
                                {this.state.editPerms ?
                                    <Button
                                        onClick={() => this.setState({
                                            addingGame: true,
                                            currentGameList: gameList.name
                                        })}
                                        color="green"
                                    >
                                        Add Game
                                    </Button>
                                    :
                                    <></>
                                }
                            </th>
                        </tr>
                    </thead>
                    <tbody>{
                        gameList.games.map((game) => (
                            <tr key={game.name}>
                                <td>
                                    <Image
                                        width={80}
                                        height={80}
                                        src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/${game.image_URL}`}
                                        alt="Random unsplash image"
                                    />
                                </td>
                                <td><Anchor component={Link} to={`/games/${game._id}`}  >{game.name}</Anchor></td>
                                <td>{game.genre}</td>
                                <td>{game.publisher}</td>
                                <td>{game.year}</td>
                                <td>
                                    {this.state.editPerms ?
                                        <Button
                                            color="red"
                                            size="xs"
                                            onClick={() => this.setState({
                                                gameToBeDeleted: game,
                                                currentGameList: gameList.name
                                            }, () => this.removeGameFromList())}
                                        >
                                            X
                                        </Button>
                                        :
                                        <></>
                                    }
                                </td>
                            </tr>
                        ))
                    }</tbody>
                </Table>
            </Accordion.Item>
        ));

        this.setState({
            displayLists: lists
        });
    }

    async createList() {
        if (this.state.createdListName.trim().length === 0) {
            this.setState({
                createListErrorMsg: "List name cannot be empty."
            })
            console.log("Cannot be empty");
        } else {
            console.log("List created: " + this.state.createdListName);

            await this.addListToDb();
            await this.fetchUser();
            this.generateList();

            this.setState({
                creatingList: false,
                createdListName: '',
            })

        }
    }
    async addListToDb() {

        console.log("creating list in db for user: " + this.state.currentUser.name);
        console.log("list name: " + this.state.createdListName);
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }

        let listUrl = "/users/"+this.state.currentUser._id+"/list?name="+this.state.createdListName;
        let response = await fetch(listUrl, requestOptions);
        console.log(response);
    }
    async addGameToList() {
        if (this.state.gameToAdd.length) {
            //print game to add info
            console.log("Game to add:");
            console.log(this.state.gameToAdd);

            //get index of the list where the game will be added to
            let listIndex = this.state.currentUser.lists.findIndex(list => list.name === this.state.currentGameList);

            //check if list contains duplicates before adding
            if (!this.checkDuplicates(listIndex)) {

                // server side for adding game
                console.log("adding game");

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                }

                let url = "/users/" + this.state.currentUser._id + "/list/addGame?gameId=" + this.state.gameToAdd[0]._id + "&index=" + listIndex;
                let response = await fetch(url, requestOptions);
                console.log(response);

                await this.fetchUser();
                this.setState({
                    addingGame: false,
                    gameToAdd: []
                }, () => {
                    this.generateList();
                    this.resetErrorMsg();
                })
            } else {
                this.setState({
                    addGameErrorMsg: "Game already exist in list."
                })
            }

        } else {
            console.log("Game not found:");
            console.log(this.state.gameToAdd);

            this.setState({
                addGameErrorMsg: "Game cannot be found. Select a game from the results provided."
            })
        }
    }

    checkDuplicates(index) {
        if ((this.state.currentUser.lists[index].games.filter((game) => game._id === this.state.gameToAdd[0]._id)).length >= 1) {
            return true;
        } else {
            return false;
        }
    }

    async removeGameFromList() {
        
        //get index of the list where the game will be removed from
        let listIndex = this.state.currentUser.lists.findIndex(list => list.name === this.state.currentGameList);

        // server side for deleting game
        console.log("deleting game");

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }

        let url = "/users/" + this.state.currentUser._id + "/list/delGame?gameId=" + this.state.gameToBeDeleted._id + "&index=" + listIndex;
        let response = await fetch(url, requestOptions);
        console.log(response);
        
        await this.fetchUser();
        this.generateList();
    }
    

    resetErrorMsg() {
        this.setState({
            addGameErrorMsg: '',
            createListErrorMsg: '',
        })
    }
    render() {

        return (
            <>
                {this.state.loggedIn ?
                    <div>
                    {this.state.loading ?
                            <div style={{ margin: 'auto', padding: 50 }}>
                                <Title order={3}>Loading profile page</Title>
                                <Loader size="xl" />
                            </div>
                            :
                            <>
                                <Modal
                                    opened={this.state.creatingList}
                                    onClose={() => this.setState({
                                        creatingList: false,
                                        createdListName: '',
                                    }, () => this.resetErrorMsg())}
                                    title="Create List"
                                >
                                    <TextInput
                                        onChange={(evt) => this.setState({
                                            createdListName: evt.target.value
                                        }, () => this.resetErrorMsg())}
                                        placeholder="List name"
                                        label="Enter Game List name:"
                                        size="md"
                                        error={this.state.createListErrorMsg}
                                        required
                                    />
                                    <br></br>
                                    <Button
                                        onClick={this.createList}
                                    >
                                        Create
                                    </Button>
                                </Modal>
                                <Modal
                                    opened={this.state.addingGame}
                                    onClose={() => this.setState({
                                        addingGame: false,
                                        currentGameList: '',
                                        gameToAdd: [],
                                    }, () => this.resetErrorMsg())}
                                    title="Add Game"
                                >
                                    {this.state.isGamesLoaded ?
                                        <>
                                            <Autocomplete
                                                onChange={evt => this.updateAddGame(evt)}
                                                label="Search game:"
                                                placeholder="Write keyword"
                                                data={this.state.gameStrings}
                                                error={this.state.addGameErrorMsg}
                                            />
                                            <Button
                                                onClick={this.addGameToList}
                                            >
                                                Add
                                            </Button>
                                        </>
                                        :
                                        <Loader size="xl" />
                                    }
                                </Modal>
                                <Grid columns={24}>
                                    <Grid.Col span={6}>
                                    
                                        <div style={{ margin: 'auto', padding: 50 }}>
                                            <Title order={2}>{this.state.currentUser.name}'s Profile</Title>
                                            <Image
                                                width="15em"
                                                height="15em"
                                                radius="md"
                                                src={this.state.currentUser.picture}
                                                alt="Random unsplash image"
                                            />
                                            <Text>
                                                Bio: {this.state.currentUser.bio}
                                            </Text>
                                        </div>
                                    </Grid.Col>
                                    <Grid.Col span={18}>
                                        <div style={{ margin: 'auto', padding: 50 }}>
                                            <SimpleGrid cols={4}>
                                                <Grid.Col span={4}>
                                                    <Title order={2}>Game List</Title>
                                                </Grid.Col>
                                                <Grid.Col span={4}>
                                                </Grid.Col>
                                                <Grid.Col span={4}>
                                                </Grid.Col>
                                                <Grid.Col span={4}>
                                                    {this.state.editPerms ?
                                                        <Button
                                                            style={{ marginRight: 'auto' }}
                                                            onClick={() => this.setState({ creatingList: true })}
                                                        >
                                                            Create List
                                                        </Button>
                                                        :
                                                        <></>
                                                    }
                                                </Grid.Col>
                                            </SimpleGrid>
                                            <Accordion iconPosition="right" >
                                                {this.state.displayLists}
                                            </Accordion>
                                        </div>
                                    </Grid.Col>
                                </Grid>
                            </>
                        }
                    </div>
                    :
                    <div>
                        <Title order={3}>Not logged in. Log in to view your profile.</Title>
                    </div>
                }
            </>
        );
    }
}


export default Profile;

