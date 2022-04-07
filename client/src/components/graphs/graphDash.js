import { Grid, SegmentedControl } from "@mantine/core";
import { Component } from "react";
import GraphController from "./graphController";

/**
 * This component renders the graph container and the control buttons which allow a user to switch between the premade graphs
 * in the home page
 */
class GraphDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [], // List of all games in the database
      graphType: "Sold-Most", // Type of graph which is displayed to the user in the homepage
      graphData: { // Object containing the list of games to be uesd in the graphs
        popularGames: [], // Games sorted by most sold
        ratingSalesGames: [], // Games sorted by most sold & grouped by rating
        leastGames: [], // Games sorted by least sold
      },
    };

    this.changeGraph = this.changeGraph.bind(this);
  }

  async componentDidMount() {
    await this.fetchGames();
    this.getGraphDatas();
  }

  /***
   * Fetches the games in the DB and adds them to the state.
   */
  async fetchGames() {
    let fetchResponse = await fetch("/api/games");
    let fetchedGames = this.sortGames(await fetchResponse.json());

    this.setState({
      games: fetchedGames,
    });
  }

  sortGames(games) {
    let sortedGames = []
      .concat(games)
      .sort((a, b) => (a.globalSales > b.globalSales ? -1 : 1));

    return sortedGames;
  }

  /**
   * Handler for the button graph selection, sets the value of the selected graph button to the graphType state.
   * @param {String} value The graph type selected by the user
   */
  changeGraph(value) {
    this.setState({ graphType: value });
  }

  /**
   * Arranges the games into their appropriate size, sorting and format in order to be passed onto the React-vis graphs
   */
  getGraphDatas() {
    let popularGames,
      ratingSalesGames,
      leastGames = [];

    // Sort games by popularity (Most sold) and keep first 10
    popularGames = []
      .concat(this.state.games)
      .sort((a, b) => a.globalSales < b.globalSales)
      .slice(0, 10);

    // Group games by criticscore and globalsales and keep first 1000
    ratingSalesGames = []
      .concat(this.state.games)
      .map((x) => {
        return { criticscore: x.criticScore, globalsales: x.globalSales, name: x.name, id: x._id };
      })
      .slice(0, 1000);

    // Sort games by least popular (least sold) and keep first 10
    leastGames = []
      .concat(this.state.games.reverse())
      .sort((a, b) => a.globalSales > b.globalSales)
      .slice(0, 10);

    // Set the sorted games into their respective states
    this.setState({
      graphData: {
        popularGames: this.getGraphDataFormat(popularGames), // Format the data to a React-vis compatible format
        leastGames: this.getGraphDataFormat(leastGames), // Format the data to a React-vis compatible format
        ratingSalesGames: ratingSalesGames,
      },
    });
  }

  /**
   * Format the data passed to a React-vis compatible object.
   * @param {list} gamesArray 
   * @returns 
   */
  getGraphDataFormat(gamesArray) {
    let dataArray = [];

    // For each game in the list, create an object with keys: (x,y) and values:(name, globalsales)
    // Then push object into array
    for (let game of gamesArray) {
      dataArray.push({ x: game.name, y: game.globalSales, id: game._id });
    }

    return dataArray;
  }

  changeState(value) {
    this.setState({ graphType: value });
  }

  /**
   * 
   * @returns Div Containing the control buttons to choose a predefined graph and the graph itself.
   */
  render() {
    return (
      <Grid>
        <Grid.Col span={12} justify="center" align="center">
          <SegmentedControl
            data={[
              { label: "Most Sold", value: "Sold-Most" },
              { label: "Most Popular Category", value: "Category-Most" },
              { label: "Least Sold", value: "Sold-Least" },
            ]}
            onChange={(value) => this.changeGraph(value)}
          />
        </Grid.Col>

        <Grid.Col>
          <GraphController states={this.state} />
        </Grid.Col>
      </Grid>
    );
  }
}

export default GraphDash;
