/* eslint-disable no-useless-constructor */
import { Component } from "react";
import { Link } from 'react-router-dom';

class Game extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <article >
                <h1>{this.props.obj.name}</h1>
                <section >
                    {this.props.obj.publisher}
                </section>
                <Link to={`/games/${this.props.obj.id}`}>
                    <button>
                        View
                    </button>
                </Link>
            </article>
        );
    }
}

export default Game;
