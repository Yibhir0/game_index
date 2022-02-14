/* eslint-disable no-useless-constructor */
import { Component } from "react";
import { Link } from 'react-router-dom';
import { Anchor } from "@mantine/core";
import TopNav from "./topnav";
class Game extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
            <TopNav />
            <article >
                <h1>{this.props.obj.name}</h1>
                <section >
                    {this.props.obj.publisher}
                </section>
                <Anchor component={Link} to={`/games/${this.props.obj.id}`} >
                    View
                </Anchor>

                </article>
            </>
        );
    }
}

export default Game;
