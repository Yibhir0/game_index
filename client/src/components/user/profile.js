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

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isGamesLoaded: false,
            gamesL: [],
            allList: [
                {
                    name: "Favorite Games 1",
                    list: []
                },
                {
                    name: "Favorite Games 2",
                    list: []
                }
            ],
            creatingList: false,
            createdListName: '',
            currentGameList: '',
            addingGame: false,
            gameToAdd: [],
            addGameErrorMsg: '',
            createListErrorMsg: '',
        };
        
        this.createList = this.createList.bind(this);
        this.generateList = this.generateList.bind(this);
        this.fetchGames = this.fetchGames.bind(this);
        this.convertStringList = this.convertStringList.bind(this);
        this.addGameToList = this.addGameToList.bind(this);
        this.resetErrorMsg = this.resetErrorMsg.bind(this);
        this.checkDuplicates = this.checkDuplicates.bind(this);
    }

    async componentDidMount() {
        this.generateList();
        await this.fetchGames();
        console.log(JSON.parse(localStorage.getItem('userProfile')));
        
    }

    async fetchGames() {
        this.setState({
            loading: true
        });
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
            { value: game.name + " (" + game.platform + ")" + " ("+game.year+")", id: game._id}
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
        const lists = this.state.allList.map((gameList) => (
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
                                <Button
                                    onClick={() => this.setState({
                                        addingGame: true,
                                        currentGameList: gameList.name
                                    })}
                                    color="green"
                                >
                                    Add Game
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{
                        gameList.list.map((game) => (
                            <tr key={game.name}>
                                <td>
                                    <Image
                                        width={80}
                                        height={80}
                                        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                                        alt="Random unsplash image"
                                    />
                                </td>
                                <td>{game.name}</td>
                                <td>{game.genre}</td>
                                <td>{game.publisher}</td>
                                <td>{game.year}</td>
                                <td>
                                    <Button color="red" size="xs">
                                        X
                                    </Button>
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

    createList() {
        if (this.state.createdListName.trim().length === 0) {
            this.setState({
                createListErrorMsg: "List name cannot be empty."
            })
            console.log("Cannot be empty");
        } else {
            console.log("List created: " + this.state.createdListName);
            this.setState({
                allList:
                    [
                        ...this.state.allList,
                        {
                            name: this.state.createdListName,
                            list: [],
                        }
                    ]
            }, () => {
                console.log(this.state.allList);
                this.generateList();
            })
            this.setState({
                creatingList: false,
                createdListName: '',
            })
            
        }
    }
    addGameToList() {
        if (this.state.gameToAdd.length) {
            //print game to add info
            console.log("Game to add:");
            console.log(this.state.gameToAdd);
            console.log(this.state.allList);

            //get index of the list where the game will be added to
            let listIndex = this.state.allList.findIndex(list => list.name === this.state.currentGameList);

            //check if list contains duplicates before adding
            if (!this.checkDuplicates(listIndex)) {
                const copyList = { ...this.state.allList };
                copyList[listIndex].list.push(this.state.gameToAdd[0]);
                
                let allList = Object.values(copyList);
                this.setState({
                    allList,
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
        if ((this.state.allList[index].list.filter((game) => game._id === this.state.gameToAdd[0]._id)).length >= 1) {
            return true;
        } else {
            return false;
        }
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
                <Modal
                    opened={this.state.creatingList}
                    onClose={() => this.setState({
                        creatingList: false,
                        createdListName: '',
                    })}
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
                    })}
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
                        
                        <div style={{margin: 'auto', padding: 50 }}>
                            <Title order={2}>Username's Profile</Title>
                            <Image
                                radius="md"
                                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                                alt="Random unsplash image"
                            />
                            <Text>
                                Bio: Hello my name is username and I love video games! Look at my games list to look at the most trending games.
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
                                    <Button
                                        style={{ marginRight: 'auto' }}
                                        onClick={() => this.setState({creatingList: true})}
                                    >
                                        Create List
                                    </Button>
                                </Grid.Col>
                            </SimpleGrid>
                            <Accordion iconPosition="right" >
                                {this.state.displayLists}
                            </Accordion>
                        </div>
                    </Grid.Col>
                </Grid>
            </>
        );
    }
}


export default Profile;

