import { Component } from "react";
import {
    ThemeIcon,
    ScrollArea,
    Space,
    Badge,
    Group,
    Textarea,
    ActionIcon,
    Loader,
    Autocomplete,
    Modal,
    Text,
    Title,
    Accordion,
    Image,
    SimpleGrid,
    Grid,
    TextInput,
    Table,
    Anchor,
    Button,
    CheckboxIcon,
} from '@mantine/core';
import { showNotification } from "@mantine/notifications";
import { Link } from 'react-router-dom';
import {
    IconMoodSad,
    IconCalendarTime,
    IconPacman,
    IconDeviceGamepad,
    IconSword,
    IconWritingSign,
    IconPhoto,
    IconPencil,
    IconMinus,
    IconPlus,
    IconCheck,
    IconFolderPlus,
    IconEdit,
    IconX,
} from '@tabler/icons';

import "../feedback/styles.css"

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
            deletingList: false,
            editingBio: false,
            bioToUpdate: '',
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
        this.deleteList = this.deleteList.bind(this);
        this.generateHeader = this.generateHeader.bind(this);
        this.generateList = this.generateList.bind(this);
        this.listContent = this.listContent.bind(this);
        this.fetchGames = this.fetchGames.bind(this);
        this.convertStringList = this.convertStringList.bind(this);
        this.addGameToList = this.addGameToList.bind(this);
        this.resetErrorMsg = this.resetErrorMsg.bind(this);
        this.checkDuplicates = this.checkDuplicates.bind(this);
        this.removeGameFromList = this.removeGameFromList.bind(this);
        this.checkPerms = this.checkPerms.bind(this);
        this.editBio = this.editBio.bind(this);
        this.displayNotification = this.displayNotification.bind(this);
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

        let url = `/api/users/${this.props.id}`;

        let response = await fetch(url, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });

        let user = await response.json();

        this.setState({
            currentUser: user,
            bioToUpdate: user.bio,
            loading: false,
        }, () => {
            console.log(this.state.currentUser);
        })
    }

    async editBio() {

        console.log("edit bio");

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }
        let url = `/api/users/${this.state.currentUser._id}/bio?desc=${this.state.bioToUpdate}`;

        let response = await fetch(url, requestOptions);
        console.log(response);

        await this.fetchUser();

        this.displayNotification(
            'Bio Edited',
            'Bio has been successfully edited',
            'orange',
            <IconPencil />
        )

        this.setState({
            editingBio: false,
            bioToUpdate: this.state.currentUser.bio
        })
    }

    async fetchGames() {

        //fetch all games
        console.log("game fetched");
        let gameUrl = "/api/games";
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

    generateHeader(header, icon) {
        return (
            <Group spacing="xs">
                <ThemeIcon
                    variant="light"
                    color="dark"
                >
                    {icon}
                </ThemeIcon>
                <Text className="text-white">{header}</Text>
            </Group>
        )
    }

    listContent(gameList) {

        if (gameList.games.length === 0) {
            return <Text>No games has been added to this list.</Text>
        }

        return (



            <Table

                dir={"ltr"}
                striped highlightOnHover
                verticalSpacing={'xl'}
                horizontalSpacing={'xs'}
            >
                <thead>
                    <tr className="bg-zinc-900">
                        <th>{this.generateHeader('Cover', <IconPhoto />)}</th>
                        <th>{this.generateHeader('Title', <IconWritingSign />)}</th>
                        <th>{this.generateHeader('Genre', <IconSword />)}</th>
                        <th>{this.generateHeader('Platform', <IconDeviceGamepad />)}</th>
                        <th>{this.generateHeader('Publisher', <IconPacman />)}</th>
                        <th>{this.generateHeader('Year', <IconCalendarTime />)}</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>{
                    gameList.games.map((game) => (
                        <tr className="bg-gradient-to-b from-zinc-900 to-zinc-800" key={game.name}>
                            <td>
                                <Image
                                    radius="sm"
                                    width={80}
                                    height={80}
                                    src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/${game.image_URL[0]}`}
                                    alt="Random unsplash image"
                                />
                            </td>
                            <td><Anchor className="text-white" component={Link} to={`/games/${game._id}`}  >{game.name}</Anchor></td>
                            <td><Badge variant="light" color="cyan">{game.genre}</Badge></td>
                            <td>{game.platform.map((platform) => <Badge variant="light">{platform}</Badge>)}</td>
                            <td><Badge variant="light" color="indigo">{game.publisher}</Badge></td>
                            <td><Badge variant="light" color="violet">{game.year}</Badge></td>
                            <td>
                                {this.state.editPerms ?
                                    <ActionIcon
                                        className="bg-gradient-to-b from-red-700 to-orange-600 hover:from-red-900 hover:to-red-800"
                                        color="red"
                                        onClick={() => this.setState({
                                            gameToBeDeleted: game,
                                            currentGameList: gameList.name
                                        }, () => this.removeGameFromList())}
                                    >
                                        <IconX />
                                    </ActionIcon>
                                    :
                                    <></>
                                }
                            </td>
                        </tr>
                    ))
                }</tbody>
            </Table>
        )
    }

    generateList() {
        const lists = this.state.currentUser.lists.map((gameList) => (
            <Accordion.Item className="border-black" label={`(${gameList.games.length}) ${gameList.name}`}>
                {this.state.editPerms ?
                    <div style={{
                        padding: 10
                    }}>
                        <Group>
                            <Button className="bg-gradient-to-b from-lime-700 to-lime-600 hover:from-lime-900 hover:to-lime-800"
                                onClick={() => this.setState({
                                    addingGame: true,
                                    currentGameList: gameList.name
                                })}
                                color="green"
                            >
                                Add Game
                            </Button>
                            <Button className="bg-gradient-to-b from-red-700 to-red-600 hover:from-red-900 hover:to-red-800"
                                onClick={() => this.setState({
                                    deletingList: true,
                                    currentGameList: gameList.name
                                })}

                                color="red"
                            >
                                Delete List
                            </Button>
                        </Group>
                    </div>
                    :
                    <></>
                }

                {gameList.games.length > 4 ?
                    <ScrollArea
                        dir={"rtl"}
                        style={{ height: 600 }}>
                        {this.listContent(gameList)}
                    </ScrollArea>
                    :
                    <>
                        {this.listContent(gameList)}
                    </>
                }
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
            if (!this.checkListDuplicates()) {
                console.log("List created: " + this.state.createdListName);
                await this.addListToDb();
                await this.fetchUser();
                this.generateList();
                
                this.displayNotification(
                    'List Added',
                    `${this.state.createdListName} has been successfully created`,
                    'green',
                    <IconPlus />,
                );
                

                this.setState({
                    creatingList: false,
                    createdListName: '',
                })
            } else {
                this.setState({
                    createListErrorMsg: "List name already exist"
                })
            }

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

        let listUrl = "/api/users/" + this.state.currentUser._id + "/list?name=" + this.state.createdListName;
        let response = await fetch(listUrl, requestOptions);
        console.log(response);
    }

    async deleteList() {
        console.log("deleting list");

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }

        let listUrl = "/api/users/" + this.state.currentUser._id + "/delList?name=" + this.state.currentGameList;
        let response = await fetch(listUrl, requestOptions);
        console.log(response);

        await this.fetchUser();

        this.displayNotification(
            'List Deleted',
            `${this.state.currentGameList} has been successfully deleted`,
            'red',
            <IconMinus />,
        );

        this.generateList();

        this.setState({
            currentGameList: '',
        })
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
                console.log("Adding game");

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                }

                let url = "/api/users/" + this.state.currentUser._id + "/list/addGame?gameId=" + this.state.gameToAdd[0]._id + "&index=" + listIndex;
                let response = await fetch(url, requestOptions);
                console.log(response);

                await this.fetchUser();

                this.displayNotification(
                    'Game Added',
                    `${this.state.gameToAdd[0].name} has been successfully added to list`,
                    'green',
                    <IconPlus />,
                );

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

    checkListDuplicates() {
        if ((this.state.currentUser.lists.filter((list) => list.name.trim() === this.state.createdListName.trim())).length >= 1) {
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

        let url = "/api/users/" + this.state.currentUser._id + "/list/delGame?gameId=" + this.state.gameToBeDeleted._id + "&index=" + listIndex;
        let response = await fetch(url, requestOptions);
        console.log(response);

        this.displayNotification(
            'Game Removed',
            `${this.state.gameToBeDeleted.name} has been successfully removed from the list`,
            'red',
            <IconMinus />,
        );
        
        await this.fetchUser();
        this.generateList();
    }


    resetErrorMsg() {
        this.setState({
            addGameErrorMsg: '',
            createListErrorMsg: '',
        })
    }

    displayNotification(title, desc, color, icon) {
        showNotification({
            title: title,
            color: color,
            icon: icon,
            style: {
                backgroundColor: '#18181b',
                borderColor: '#18181b'
            },
            styles: (theme) => ({
                title: { color: theme.white },
                description: { color: theme.white },
                closeButton: {
                    color: theme.colors.red[7]
                  },
            }),
            message: desc,
        })
    }

    render() {

        return (
            <div>
                {this.state.loggedIn ?
                    <div>
                        {this.state.loading ?
                            <div style={{ margin: 'auto', padding: 50 }}>
                                <Title order={3}>Loading profile page</Title>
                                <Loader size="xl" />
                            </div>
                            :



                            <>
                                {/* All modals */}
                                {/* Creating List */}
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
                                        className="bg-gradient-to-b from-blue-700 to-blue-600 hover:from-blue-900 hover:to-blue-800"

                                        radius="sm"
                                        color="blue"
                                        variant="filled"
                                        onClick={this.createList}
                                    >
                                        Create
                                    </Button>
                                </Modal>

                                {/* Adding Game */}
                                <Modal
                                    size="lg"
                                    opened={this.state.addingGame}
                                    onClose={() => this.setState({
                                        addingGame: false,
                                        currentGameList: '',
                                        gameToAdd: [],
                                    }, () => this.resetErrorMsg())}
                                    title="Add Game"
                                >
                                    <Title order={6}>Selected Game:</Title>
                                    {this.state.gameToAdd.length ?
                                        <SimpleGrid cols={4}>
                                            <div>
                                                <Image
                                                    width={130}
                                                    height={130}
                                                    src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/${this.state.gameToAdd[0].image_URL[0]}`}
                                                    alt="Image failed to load"
                                                />
                                            </div>
                                            <div>
                                                <Title order={6}>Name:</Title>
                                                <Text>{this.state.gameToAdd[0].name}</Text>
                                                <Title order={6}>Console:</Title>
                                                <Text>{this.state.gameToAdd[0].platform.map((platform) => <Text>{platform}</Text>)}</Text>
                                                <Title order={6}>Year Released:</Title>
                                                <Text>{this.state.gameToAdd[0].year}</Text>
                                            </div>
                                        </SimpleGrid>
                                        :
                                        <SimpleGrid cols={4}>
                                            <div>
                                                <Image
                                                    width={130}
                                                    height={130}
                                                    alt="Image failed to load"
                                                    withPlaceholder
                                                />
                                            </div>
                                            <div>
                                                <Title order={6}>Name:</Title>
                                                <Text>None</Text>
                                                <Title order={6}>Console:</Title>
                                                <Text>None</Text>
                                                <Title order={6}>Year Released:</Title>
                                                <Text>None</Text>
                                            </div>
                                        </SimpleGrid>
                                    }
                                    {this.state.isGamesLoaded ?
                                        <>
                                            <Autocomplete
                                                onChange={evt => this.updateAddGame(evt)}
                                                label="Search game:"
                                                placeholder="Write keyword"
                                                data={this.state.gameStrings}
                                                error={this.state.addGameErrorMsg}
                                            />
                                            <br></br>
                                            <Button
                                                className="bg-gradient-to-b from-green-700 to-green-600 hover:from-green-900 hover:to-green-800"

                                                radius="sm"
                                                color="green"
                                                variant="filled"
                                                onClick={this.addGameToList}
                                            >
                                                Add
                                            </Button>
                                        </>
                                        :
                                        <Loader size="xl" />
                                    }
                                </Modal>

                                {/* Deleting List */}

                                <Modal
                                    opened={this.state.deletingList}
                                    onClose={() => this.setState({
                                        deletingList: false,
                                        currentGameList: '',
                                    }, () => this.resetErrorMsg())}
                                    title="Delete List"
                                >
                                    <Title order={4}>Are you sure you want to delete this list?</Title>
                                    <br></br>
                                    <Text>Deleting the list will remove all games added. <br></br>This action cannot be undone.</Text>
                                    <br></br>
                                    <SimpleGrid cols={5}>
                                        <div>
                                            <Button
                                                className="bg-gradient-to-b from-green-700 to-green-600 hover:from-green-900 hover:to-green-800"
                                                color="green"
                                                onClick={() => this.setState({
                                                    deletingList: false
                                                }, () => this.deleteList())}
                                            >
                                                Yes
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                className="bg-gradient-to-b from-red-700 to-red-600 hover:from-red-900 hover:to-red-800"
                                                color="red"
                                                onClick={() => this.setState({
                                                    deletingList: false,
                                                    currentGameList: '',
                                                })}
                                            >
                                                No
                                            </Button>
                                        </div>
                                    </SimpleGrid>
                                </Modal>

                                {/* Editing Bio */}
                                <Modal
                                    size="lg"
                                    opened={this.state.editingBio}
                                    onClose={() => this.setState({
                                        editingBio: false,
                                    }, () => this.resetErrorMsg())}
                                    title="Edit Bio"
                                >
                                    <Textarea
                                        defaultValue={this.state.currentUser.bio}
                                        onChange={(evt) => this.setState({
                                            bioToUpdate: evt.target.value
                                        })}
                                        placeholder="Your Bio"
                                    />
                                    <br></br>
                                    <Button className="bg-gradient-to-b from-lime-700 to-lime-600 hover:from-lime-900 hover:to-lime-800"
                                        onClick={() => this.editBio()}
                                    >
                                        Edit
                                    </Button>

                                </Modal>

                                {/* End of all modals*/}

                                <Grid columns={24}>
                                    <Grid.Col span={6}>

                                        <div style={{ margin: 'auto', padding: 50 }}>
                                            <Title order={2}>{this.state.currentUser.name}'s Profile</Title>
                                            <br></br>
                                            <Image
                                                width="15em"
                                                height="15em"
                                                radius="md"
                                                src={this.state.currentUser.picture}
                                                alt="Image failed to load"
                                                withPlaceholder
                                            />
                                            <br></br>
                                            <Group>
                                                <Title order={3}>
                                                    Bio
                                                </Title>

                                                {this.state.editPerms ?
                                                    <ActionIcon onClick={() => this.setState({
                                                        editingBio: true,
                                                    })}
                                                        className="bg-gradient-to-b from-orange-700 to-orange-600 hover:from-orange-900 hover:to-orange-800"
                                                        radius="sm"
                                                        color="orange"
                                                        variant="filled"
                                                    >
                                                        <IconEdit />
                                                    </ActionIcon>
                                                    :
                                                    <></>
                                                }
                                            </Group>
                                            <Space h="md" />
                                            <Text className="commentText">
                                                <Space h="sm"/>
                                                {this.state.currentUser.bio}
                                            </Text>
                                        </div>

                                    </Grid.Col>
                                    <Grid.Col span={18}>
                                        <div style={{ margin: 'auto', padding: 50 }}>
                                            <Group>
                                                <Title
                                                    order={2}
                                                >     
                                                    Game List
                                                </Title>
                                                {this.state.editPerms ?
                                                    <ActionIcon
                                                        className="bg-gradient-to-b from-sky-700 to-sky-600 hover:from-sky-900 hover:to-sky-800"
                                                        radius="sm"
                                                        variant="filled"
                                                        color="blue"
                                                        onClick={() => this.setState({ creatingList: true })}
                                                    >
                                                        <IconFolderPlus />
                                                    </ActionIcon>
                                                    :
                                                    <></>
                                                }

                                            </Group>
                                            <div>
                                                {this.state.currentUser.lists.length === 0 ?
                                                    <div>
                                                        <Space h="md" />
                                                        <Group>
                                                            <ThemeIcon variant="light" color="dark">
                                                                <IconMoodSad/>
                                                            </ThemeIcon>
                                                            <Text weight={500}>User has not created any list yet </Text>
                                                        </Group>
                                                    </div>
                                                    : <></>}
                                            </div>

                                            <Space h="md" />
                                            <Accordion
                                                className="shadow-xl bg-zinc-900"
                                                styles={(theme) =>({
                                                    label: {
                                                        color: '#f8fafc',   
                                                    },
                                                    item: {
                                                        border: '0px solid transparent',
                                                        borderRadius: theme.radius.sm,
                                                    },
                                                    itemTitle: { color: '#f8fafc' },
                                                    icon: { color: '#fde047'},
                                                    control: {
                                                        '&:hover':
                                                        {
                                                          backgroundColor: '#18181b',
                                                          opacity: 0.6,
                                                        },
                                                      },
                                                })}
                                            >
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
            </div>
        );
    }
}


export default Profile;

