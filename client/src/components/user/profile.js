import { Component, useState } from "react";
import {
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
            allList: [
                {
                    name: "Favorite Games 1",
                    list: [
                        {name: 'Mario', genre: 'Platform', platform: 'DS', publisher: 'Nintendo', year: 123 },
                        {name: 'Sonic', genre: 'Platform', platform: 'DS', publisher: 'SEGA', year: 123},
                        {name: 'COD', genre: 'Shooter', platform: 'DS', publisher: 'IDK', year: 123},
                    ]
                },
                {
                    name: "Favorite Games 2",
                    list: [
                        {name: 'Mario', genre: 'Platform', platform: 'DS', publisher: 'Nintendo', year: 123 },
                        {name: 'Sonic', genre: 'Platform', platform: 'DS', publisher: 'SEGA', year: 123},
                        {name: 'COD', genre: 'Shooter', platform: 'DS', publisher: 'IDK', year: 123},
                    ]
                }
            ],
            creatingList: false,
            createdListName: '',
        };

        this.createList = this.createList.bind(this);
        this.generateList = this.generateList.bind(this);
    }

    async componentDidMount() {
        this.generateList();
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
                                <Button color="green">
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
                        onChange={(evt) => this.setState({createdListName: evt.target.value})}
                        placeholder="List name"
                        label="Enter Game List name:"
                        size="md"
                        required
                    />
                    <br></br>
                    <Button
                        onClick={this.createList}
                    >
                        Create
                    </Button>
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

