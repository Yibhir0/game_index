import { Component } from "react";
import {
  Center,
  ThemeIcon,
  Group,
  Tooltip,
  Space,
  Badge,
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
import {
  IconStar,
  IconWorld,
  IconListNumbers,
  IconCalendarTime,
  IconPacman,
  IconDeviceGamepad,
  IconSword,
  IconWritingSign,
  IconPhoto,

} from '@tabler/icons';
import StarsRating from "stars-rating";
import { Link } from 'react-router-dom';
import SearchPopUp from "../graphs/searchPopUp";


/**
 * This component renders all the games and 
 * deals with searching, sorting, and filtering.
 */

class Games extends Component {

  /**
   * Constructor that sets up all the values required for game list to function
   * @param {*} props 
   */
  constructor(props) {
    super(props);

    // Variable that converts all the values of the genres to labels
    this.genres = [
      { value: "", label: "All" },
      { value: "shooter", label: "Shooter" },
      { value: "fighting", label: "Fighting" },
      { value: "action", label: "Action" },
      { value: "adventure", label: "Adventure" },
      { value: "platform", label: "Platform" },
      { value: "misc", label: "Misc" },
      { value: "mmo", label: "MMO" },
      { value: "visual novel", label: "Visual Novel" },
      { value: "puzzle", label: "Puzzle" },
      { value: "party", label: "Party" },
      { value: "simulation", label: "Simulation" },
      { value: "music", label: "Music" },
      { value: "role-playing", label: "Role-Playing" },
      { value: "strategy", label: "Strategy" },
      { value: "racing", label: "Racing" },
      { value: "action-adventure", label: "Action-Adventure" },
      { value: "sports", label: "Sports" },
    ];

    // Variable that converts all the values of platforms to labels
    this.platforms = [
      { value: "", label: "All" },
      { value: "PC", label: "Personal Computer (PC)" },
      { value: "GB", label: "Game Boy" },
      { value: "GBA", label: "Game Boy Advance" },
      { value: "DS", label: "Nintendo DS" },
      { value: "3DS", label: "Nintendo 3DS" },
      { value: "N64", label: "Nintendo 64" },
      { value: "NES", label: "Nintendo Entertainment System" },
      { value: "GC", label: "Nintendo GameCube" },
      { value: "SNES", label: "Super Nintendo Entertainment System" },
      { value: "Wii", label: "Wii" },
      { value: "WiiU", label: "Wii U" },
      { value: "PS", label: "PlayStation" },
      { value: "PS2", label: "PlayStation 2" },
      { value: "PS3", label: "PlayStation 3" },
      { value: "PS4", label: "PlayStation 4" },
      { value: "PSP", label: "PlayStation Portable" },
      { value: "PSV", label: "PlayStation Vita" },
      { value: "XB", label: "Xbox" },
      { value: "X360", label: "Xbox 360" },
      { value: "XOne", label: "Xbox One" },
      { value: "GEN", label: "Sega Genesis" },
      { value: "SCD", label: "Sega CD" },
      { value: "SAT", label: "Sega Saturn" },
      { value: "DC", label: "Dreamcast" },
      { value: "2600", label: "Atari 2600" },
      { value: "NG", label: "Neo Geo" },
      { value: "3DO", label: "3DO Interactive Multiplayer" },
      { value: "PCFX", label: "PC-FX" },
      { value: "WS", label: "WonderSwan" },
    ];

    this.state = {
      loading: true,
      gamesL: [], //contains all the games for the current list, will be changed every time a new query is made
      pageNumber: 1, //current page
      gamesPerPage: 10, //number of games to display per page
      filters: {
        toggle: false, //decides whether to do a filtered search or not
        keywords: "", //keywords for the search feature, can represent the name, genre, publisher, etc
        year: "", //year the game has been released
        publisher: "", //publisher of the video game
        genre: "", //genre for the video game
        platform: "", //platform for the video game
      },
      sort: "gs", //gs = global sales, cs = critic score, determines how to sort the list
      ordering: [-1, 1], // -1,1 = descending, 1,-1 = ascending
    };

    this.search = this.search.bind(this);
    this.sortGames = this.sortGames.bind(this);
    this.generateRows = this.generateRows.bind(this);
    this.changePage = this.changePage.bind(this);
    this.setupPagination = this.setupPagination.bind(this);
    this.generateHeader = this.generateHeader.bind(this);
  }

  /**
   * When component has been mounted, fetches all games, sets up pagination and automatically sorts all games by global sales descending
   */
  async componentDidMount() {
    await this.fetchGames();
    this.setupPagination();
    this.sortGames();
  }

  /**
   * setupPagination sets up the pagination on the client side
   */
  async setupPagination() {

    //sets the total number of page for pagination
    this.setState(
      {
        totalPages: Math.ceil(
          this.state.gamesL.length / this.state.gamesPerPage
        ),
      },
      () => {
      }
    );
  }

  /**
   * fetchGames fetches all games from the database
   */
  async fetchGames() {

    //when loading is true, a loading spinner will appear
    this.setState({
      loading: true,
    });

    //fetch all games
    let gameUrl = "/api/games";
    let response = await fetch(gameUrl);
    let games = await response.json();

    //after all games are fetched, the data is stored in a state
    this.setState({
      gamesL: games,
    });
  }

  /**
   * fetchGamesByFilter fetches all games corresponding to the filters the user has used
   */
  async fetchGamesByFilter() {

    //when loading is true, a loading spinner will appear
    this.setState({
      loading: true,
    });

    //fetch all games by filters
    let gameUrl =
      "/api/games/filter?" +
      "keywords=" +
      this.state.filters.keywords +
      "&year=" +
      this.state.filters.year +
      "&publisher=" +
      this.state.filters.publisher +
      "&genre=" +
      this.state.filters.genre +
      "&platform=" +
      this.state.filters.platform;
    
    let response = await fetch(gameUrl);
    let games = await response.json();

    //after all results are fetched, the data is stored in a state
    this.setState({
      gamesL: games,
    });
  }

  /**
   * search starts searching from the database based on what type of search the user wants to do
   */
  async search() {

    //verifies if the keywords are empty or not
    if (
      this.state.filters.keywords === "" ||
      this.state.filters.keywords.trim().length === 0
    ) {
      //verifies if any keyword in publisher field, if there is then fetch games by filter
      if (
        this.state.filters.publisher === "" ||
        this.state.filters.publisher.trim().length === 0
      ) {
        //if filter toggle is on, then it will do a filtered search with no keywords
        //this means that the user has toggled a filtered search by inputting a year of release value
        //or selecting a genre. if its not a filtered search then it will just fetch all games
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

    //after searching, the page number is set back to 1, pagination is setup and rows are generated
    this.setState(
      {
        pageNumber: 1,
      },
      () => {
        this.setupPagination();
        this.generateRows();
      }
    );
  }

  /**
   * sortGames sort the game list depending on what option the user has chosen
   */
  sortGames() {

    //sort by global sales
    if (this.state.sort === "gs") {

      const sortedGames = []
        .concat(this.state.gamesL)
        .sort((a, b) =>
          a.globalSales > b.globalSales
            ? this.state.ordering[0]
            : this.state.ordering[1]
      );
      
      //after sorting, page number is resetted back to 1 and the sorted list is stored in a state
      this.setState(
        {
          pageNumber: 1,
          gamesL: sortedGames,
        },
        () => {

          //rows gets generated after sortings
          this.generateRows();
        }
      );

      //sort by critic score
    } else if (this.state.sort === "cs") {
      const sortedGames = []
        .concat(this.state.gamesL)
        .sort((a, b) =>
          a.criticScore > b.criticScore
            ? this.state.ordering[0]
            : this.state.ordering[1]
        );
      //after sorting, page number is resetted back to 1 and the sorted list is stored in a state
      this.setState({
        pageNumber: 1,
        gamesL: sortedGames,
      },
        () => {

          //rows gets generated after sortings
          this.generateRows();
        });
    }
  }


  /**
   * generateRows generates the rows for the game listing
   */
  async generateRows() {

    //state containing the data to display the games is being mapped
    const rows = this.state.gamesL.map((game, index) => (
      <tr className="bg-gradient-to-b from-zinc-900 to-zinc-800" key={index + 1}>
        <td><Badge color="dark">{index + 1}</Badge></td>
        <td>
          <Avatar
            src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/${game.image_URL[0]}`}
            size="lg"
          />
        </td>
        <td>
          <Anchor className="text-white" component={Link} to={`/games/${game._id}`}>
            {game.name}
          </Anchor>
        </td>
        <td><Badge variant="light" color="cyan">{game.genre}</Badge></td>
        <td>{game.platform.map((platform, index) => (<Badge variant="light" key={index + 1}>{platformNameUpdate(platform)}</Badge>))}</td>
        <td><Badge variant="light" color="indigo">{game.publisher}</Badge></td>
        <td><Badge variant="light" color="violet">{game.year}</Badge></td>
        <td><Badge variant="light" color="grape">{numberWithCommas(game.globalSales)}</Badge></td>
        <td>{returnCriticData(game.criticScore)}</td>
      </tr>
    ));

    // rows are then split into 10 results per page, loading is set to false since the rows have been loaded
    this.setState({
      rows: rows.slice(
        (this.state.pageNumber - 1) * 10,
        this.state.pageNumber * 10
      ),
      loading: false,
    });
  }

  
  /**
   * updateKeywords update the keywords the user has inputted
   * @param {*} evt event
   */
  updateKeywords(evt) {

    //retrieve filters and clone, keywords from that filter is updated and then update the state filter
    const filters = { ...this.state.filters };
    filters.keywords = evt.target.value;
    this.setState({ filters });
  }

  /**
   * updateYear update the year the user has inputted
   * @param {*} evt event
   */
  updateYear(evt) {

    //retrieve filters and clone, year from that filter is updated and then update the state filter
    const filters = { ...this.state.filters };
    filters.toggle = true;
    
    if (evt === undefined) {
      filters.year = "";
    } else {
      filters.year = evt;
    }

    this.setState({ filters });
  }

  /**
   * updatePublisher updates the publisher the user has inputted
   * @param {*} evt event
   */
  updatePublisher(evt) {
    
    // retrieve filters and clone, publisher from that filter is updated and then update the state filter
    const filters = { ...this.state.filters };
    filters.publisher = evt.target.value;
    this.setState({ filters });
  }

  /**
   * updateGenre updates the genre the user has inputted
   * @param {*} evt event
   */
  updateGenre(evt) {

    // retrieve filters and clone, genre from that filter is updated and then update the state filter
    const filters = { ...this.state.filters };
    filters.genre = evt.target.value;
    filters.toggle = true;
    this.setState({ filters });
  }

  /**
   * updatePlatform updates the platform the user has inputted
   * @param {*} evt event
   */
  updatePlatform(evt) {

    // retrieve filters and clone, platform from that filter is updated and then update the state filter
    const filters = { ...this.state.filters };
    filters.platform = evt.target.value;
    filters.toggle = true;
    this.setState({ filters });
  }

  /**
   * updateSort updates the sorting algorithm used that the user has chosen
   * @param {*} evt event
   */
  updateSort(evt) {
    this.setState({
      sort: evt,
    });
  }

  /**
   * updateOrdering updates the ordering of the sorting
   * @param {*} evt event
   */
  updateOrdering(evt) {

    // order by descending
    if (evt.target.value === "desc") {
      this.setState(
        {
          ordering: [-1, 1],
        }
      );
    
    //order by ascending
    } else if (evt.target.value === "asc") {
      this.setState(
        {
          ordering: [1, -1],
        }
      );
    }
  }

  /**
   * changePage changes the page number when the user clicks on a page number
   * @param {*} evt event
   */
  changePage(evt) {

    //if statement to prevent users from clicking on the same page button
    if (this.state.pageNumber !== evt) {
      //if user clicks on a different page number, the page number will change and then regenerate the new rows
      const page = evt;
      this.setState(
        {
          pageNumber: page,
        },
        () => {
          //generates the new rows when page number has changed
          this.generateRows();
        }
      );
    }
  }

  /**
   * generateHeader generates table headers
   * @param {*} header The header text
   * @param {*} icon The header icon
   * @param {*} color The header color
   * @returns header with icon
   */
  generateHeader(header, icon, color) {
    return (
      <Group spacing="xs">
        <ThemeIcon
          variant="light"
          color={color}
        >
          {icon}
        </ThemeIcon>
        <Text className="text-white">{header}</Text>
      </Group>
    )
  }

  /**
   * renders the component
   * @returns rendered component
   */
  render() {
    return (
      <>
        <SimpleGrid spacing="xl" cols={3}>
          <Grid.Col span={4}>
            <TextInput
              size="xl"
              styles={{
                label: { color: '#f8fafc' },
                input: {
                  border: 0,
                  '&:focus-visible':
                  {
                    color: '#fde047',
                  },
                  backgroundColor: '#18181b',
                },
              }}

              // updates keyword whenever user writes in the search input
              onChange={(evt) => this.updateKeywords(evt)}
              // if user presses the enter button, it will automatically search
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  this.search();
                }
              }}

              placeholder="Search by Keyword"
              variant="filled"

            />
            <Space h="md" />
            <Group>
              {/*  starts searching when button has been pressed */}
              <Button className="duration-200 shadow-md hover:scale-110 bg-zinc-900 hover:bg-yellow-600" onClick={this.search}>Search</Button>
              {/* pop up for displaying graphs based on the current game listing */}
              <SearchPopUp games={this.state.gamesL} page={this.state.pageNumber} />
            </Group>
          </Grid.Col>
          <Grid.Col span={4}>
            <Accordion
              className="shadow-xl bg-zinc-900"
              styles={(theme) => ({
                label: {
                  color: '#f8fafc',
                },
                item: {
                  border: '1px solid transparent',
                  borderRadius: theme.radius.sm,
                },
                itemTitle: { color: '#f8fafc' },
                icon: { color: '#fde047' },
                control: {
                  '&:hover':
                  {
                    backgroundColor: '#18181b',
                    opacity: 0.6,
                  },
                },
              })}
            >
              <Accordion.Item label="Filter">
                <SimpleGrid cols={2}>
                  <Grid.Col span={4}>
                    <TextInput
                      styles={{
                        label: { color: '#f8fafc' },
                        backgroundColor: { color: '#334155' },
                        input: {
                          border: 0,
                          '&:focus-visible':
                          {
                            color: '#fde047',
                          },
                        }
                      }}
                      // updates publisher value when user changes publisher input
                      onChange={(evt) => this.updatePublisher(evt)}
                      // pressing enter button searches automatically
                      onKeyPress={(ev) => {
                        if (ev.key === "Enter") {
                          ev.preventDefault();
                          this.search();
                        }
                      }}
                      placeholder="Filter by Publisher name"
                      label="Publisher:"
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <NumberInput
                      styles={{
                        label: { color: '#f8fafc' },
                        input: {
                          border: 0,
                          '&:focus-visible':
                          {
                            color: '#fde047',
                          },
                        }
                      }}
                      // updates year value when user changes year input
                      onChange={(evt) => this.updateYear(evt)}
                      // pressing enter button searches automatically
                      onKeyPress={(ev) => {
                        if (ev.key === "Enter") {
                          ev.preventDefault();
                          this.search();
                        }
                      }}
                      min={1977}
                      max={2020}
                      placeholder="Filter by Year Released"
                      label="Year Released"
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <NativeSelect
                      styles={{
                        label: { color: '#f8fafc' },
                        input: {
                          border: 0,
                        }
                      }}
                      // updates genre value when user changes genre input
                      onChange={(evt) => this.updateGenre(evt)}
                      data={this.genres}
                      label="Genre"
                      placeholder="Filter by Genre"
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <NativeSelect
                      styles={{
                        label: { color: '#f8fafc' },
                        input: {
                          border: 0,
                        }
                      }}
                      // updates platform value when user changes platform input
                      onChange={(evt) => this.updatePlatform(evt)}
                      data={this.platforms}
                      label="Platform"
                      placeholder="Filter by Platform" s
                    />
                  </Grid.Col>
                </SimpleGrid>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
          <Grid.Col span={4}>
            <Accordion
              className="shadow-xl bg-zinc-900"
              styles={(theme) => ({
                label: {
                  color: '#f8fafc',
                },
                item: {
                  border: '1px solid transparent',
                  borderRadius: theme.radius.sm,
                },
                itemTitle: { color: '#f8fafc' },
                icon: { color: '#fde047' },
                control: {
                  '&:hover':
                  {
                    backgroundColor: '#18181b',
                    opacity: 0.6,
                  },
                },
              })}
            >
              <Accordion.Item label="Sort">
                <RadioGroup
                  styles={{
                    label: { color: '#f8fafc' },
                  }}
                  // updates sorting algorithm when user changes sorting algorithm
                  onChange={(evt) => this.updateSort(evt)}
                  defaultValue="gs"
                  label="Sort by:"
                  color="yellow"
                >
                  <Radio value="gs">Global Sales</Radio>
                  <Radio value="cs">Critic Score</Radio>
                </RadioGroup>
                <br />
                <NativeSelect
                  styles={{
                    label: { color: '#f8fafc' },
                    input: {
                      border: 0,
                    }
                  }}
                  onChange={(evt) => this.updateOrdering(evt)}
                  defaultValue="desc"
                  label="Order by:"
                  placeholder="Select order"
                  data={[
                    { value: "desc", label: "Descending" },
                    { value: "asc", label: "Ascending" },
                  ]}
                />
                <br />
                <Button className="text-white bg-gradient-to-b from-yellow-700 to-yellow-500 hover:from-yellow-900 hover:to-yellow-700" onClick={this.sortGames}>Sort</Button>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
        </SimpleGrid>
        <Space h="md" />
        {/* load spinner when loading, otherwise display the table with all the data */}
        {this.state.loading ? (
          <div style={{ margin: "auto", padding: 50 }}>
            <Title order={3}>Fetching All Games</Title>
            <Loader size="xl" />
          </div>
        ) : (
          <div>
            <Table className="shadow-xl" verticalSpacing="md" striped highlightOnHover>
              <thead>
                <tr className="bg-zinc-900">
                  <th>{this.generateHeader('', <IconListNumbers />, 'dark')}</th>
                  <th>{this.generateHeader('Cover', <IconPhoto />, 'dark')}</th>
                  <th>{this.generateHeader('Title', <IconWritingSign />, 'dark')}</th>
                  <th>{this.generateHeader('Genre', <IconSword />, 'dark')}</th>
                  <th>{this.generateHeader('Platform', <IconDeviceGamepad />, 'dark')}</th>
                  <th>{this.generateHeader('Publisher', <IconPacman />, 'dark')}</th>
                  <th>{this.generateHeader('Year', <IconCalendarTime />, 'dark')}</th>
                  <th>{this.generateHeader('Global Sales', <IconWorld />, 'dark')}</th>
                  <th>{this.generateHeader('Critic Score', <IconStar />, 'dark')}</th>
                </tr>
              </thead>
              <tbody>{this.state.rows}</tbody>
            </Table>
            <Center>
              <Pagination
                className="bg-zinc-900"
                styles={{
                  item: {
                    backgroundColor: '#18181b'
                  },
                  active: { color: '#ca8a04' }
                }}
                total={this.state.totalPages}
                page={this.state.pageNumber}
                onChange={(evt) => this.changePage(evt)}
              />
            </Center>
          </div>
        )}
      </>
    );
  }
}

/**
 * returnCriticData returns critic value under the form of stars
 * @param {*} criticScore the critic score
 * @returns a star representation of the critic score
 */
function returnCriticData(criticScore) {
  let criticText;

  // critic score with 0 is unrated
  if (criticScore === 0) {
    criticText = "Not Rated";
    return (
      <Tooltip withArrow label={"Not Rated by Critics"}>
        <Badge color="gray">{criticText}</Badge>
      </Tooltip>);
  // else makes a star rating with critic score
  } else {
    criticText = (<StarsRating count={5} half={true}
      value={criticScore}
      edit={false}
      size={24}
      color2={"#ffd700"}
    />);
    return (
      <Tooltip withArrow label={criticScore}>
        {criticText}
      </Tooltip>);
  }
}

function numberWithCommas(x) {
  if (x === undefined) {
    return "None on  Record";
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * platformNameUpdate changes the name of platforms to be a lot more user friendly
 * @param {*} name name of the platform
 * @returns returns reformatted platform name
 */
function platformNameUpdate(name) {
  switch (name) {
    case "WiiU":
      return "Wii U";
    case "GC":
      return "Game Cube";
    case "PSV":
      return "PS Vita";
    case "XB":
      return "Xbox";
    case "X360":
      return "Xbox 360";
    case "XOne":
      return "Xbox One";
    case "GEN":
      return "Sega Genesis";
    case "SCD":
      return "Sega CD";
    case "SAT":
      return "Sega Saturn";
    case "DC":
      return "Dreamcast";
    case "2600":
      return "Atari 2600";
    case "NG":
      return "Neo Geo";
    case "3DO":
      return "3DO Interactive Multiplayer";
    case "PCFX":
      return "PC-FX";
    case "WS":
      return "WonderSwan";
    default:
      return name;
  }
}

export default Games;
