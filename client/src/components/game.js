/* eslint-disable no-useless-constructor */
import { Component } from "react";


class Game extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <article >
                <h1>{this.props.game.name}</h1>
                <section >
                    {this.props.game.publisher}
                </section>
            </article>
        );
    }
}

export default Game;
