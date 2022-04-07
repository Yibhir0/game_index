import { Grid, SegmentedControl } from "@mantine/core";
import { Component } from "react";
import GraphController from "./graphController";

/**
 * This renders the graph dash
 */
class GraphDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      gamesReversed: [],
      graphType: "Sold-Most",
      graphData: {
        popularGames: [],
        ratingSalesGames: [],
        leastGames: [],
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
   * Handler for the button graph selection.
   * @param {*} value
   */
  changeGraph(value) {
    this.setState({ graphType: value });
  }

  getGraphDatas() {
    let popularGames,
      ratingSalesGames,
      leastGames = [];

    popularGames = []
      .concat(this.state.games)
      .sort((a, b) => a.globalSales < b.globalSales)
      .slice(0, 10);

    ratingSalesGames = []
      .concat(this.state.games)
      .map((x) => {
        return { criticscore: x.criticScore, globalsales: x.globalSales, name: x.name, id: x._id };
      })
      .slice(0, 1000);

    leastGames = []
      .concat(this.state.games.reverse())
      .sort((a, b) => a.globalSales > b.globalSales)
      .slice(0, 10);

    this.setState({
      graphData: {
        popularGames: this.getGraphDataFormat(popularGames),
        ratingSalesGames: ratingSalesGames,
        leastGames: this.getGraphDataFormat(leastGames),
      },
    });
  }

  getGraphDataFormat(gamesArray) {
    let dataArray = [];

    for (let game of gamesArray) {
      dataArray.push({ x: game.name, y: game.globalSales, id: game._id });
    }

    return dataArray;
  }

  changeState(value) {
    this.setState({ graphType: value });
  }

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
