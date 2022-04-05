import React, { Component } from "react";
import TopNav from "./navbar/topnav";
import {
  Space,
  Paper,
  Center,
  Grid,
  Text,
  PasswordInput,
  TextInput,
  Loader,
  Title,
  List,
  Divider,
  ScrollArea,
  Avatar,
  Image,
  SimpleGrid,
  Tooltip,
  Anchor,
} from "@mantine/core";
import GraphDash from "./graphs/graphDash";
import "../index.css";
import { Link } from "react-router-dom";

/**
 * This class renders the home page.
 */
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
    };
  }

  async componentDidMount() {
    await this.fetchGames();
  }

  /***
   * Fetches the games in the DB and adds them to the state.
   */
  async fetchGames() {
    let fetchResponse = await fetch("/api/games");
    let fetchedGames = this.sortGames(await fetchResponse.json()).slice(
      0,
      200
    );

    this.setState({
      games: fetchedGames,
    });
  }

  render() {
    return (
      <div>
        <Space h='xl' />
        <div className="shadow-2xl bg-gradient-to-b from-zinc-900 to-zinc-800">
          <Center style={{ height: 200 }}>
            <Title
              align="center"
              order={1}
              sx={(theme) => ({
                color: '#f8fafc'
              })}
            >
              Welcome to the most <Title order={1} sx={(theme) => ({color: '#fde047'})}>POPULAR</Title>Gaming Database
            </Title>
          </Center>

          <Grid justify="center">
            <Grid.Col span={12} justify="center">
              <Text
                size="xl"
                align="center"
                sx={(theme) => ({
                  color: '#f8fafc'
                })}
              >
                {" "}
                Everything you need for searching or analyzing games
              </Text>
            </Grid.Col>
          </Grid>
          <br></br>
          <Center>
            <ScrollArea style={{ height: 200 }}>
              <SimpleGrid
                breakpoints={[{ maxWidth: 200, maxHeight: 0 }]}
                cols={this.state.games.length}
                spacing="110px"
              >
                {this.state.games.map((image, i) => (
                  <Center>
                    <Tooltip withArrow label={this.state.games[i].name} key={i}>
                      <Anchor
                        component={Link}
                        to={`/games/${this.state.games[i]._id}`}
                      >
                        <Image
                          radius="sm"
                          className="duration-200 shadow-md hover:scale-150"
                          style={{ minHeight: 100, minWidth: 100}}
                          src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/${this.state.games[i].image_URL[0]}`}
                        />
                      </Anchor>
                    </Tooltip>
                  </Center>
                ))}
              </SimpleGrid>
            </ScrollArea>
          </Center>
          <Space h="md"/>
        </div> 
        <Divider variant="dashed" />

        <GraphDash></GraphDash>
      </div>
    );
  }

  sortGames(games) {
    const sortedGames = []
      .concat(games)
      .sort((a, b) => (a.globalSales > b.globalSales ? -1 : 1));
    return sortedGames;
  }
}
export default Home;
