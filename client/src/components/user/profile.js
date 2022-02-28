import { Component, useState } from "react";
import {
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
    NativeSelect
} from '@mantine/core';
import { Link } from 'react-router-dom';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allList: [
                [
                    {name: 'Mario', genre: 'Platform', platform: 'DS', publisher: 'Nintendo', year: 123 },
                    {name: 'Sonic', genre: 'Platform', platform: 'DS', publisher: 'SEGA', year: 123},
                    {name: 'COD', genre: 'Shooter', platform: 'DS', publisher: 'IDK', year: 123},
                ]
            ]
        };
    }

    async componentDidMount() {
    }

    render() {
        
        return (
            <>
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
                        <div style={{margin: 'auto', padding: 50 }}>
                            <Title order={2}>Game List</Title>
                            <Button>Create List</Button>
                            <Accordion iconPosition="right" >
                                <Accordion.Item label="Favorite Games">
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
                                            this.state.allList[0].map((game) => (
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

                                <Accordion.Item label="Play Later">
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
                                            this.state.allList[0].map((game) => (
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
                            </Accordion>
                        </div>
                    </Grid.Col>
                </Grid>
            </>
        );
    }
}


export default Profile;

