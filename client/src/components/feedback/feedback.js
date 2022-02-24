import { Component } from "react";
import { Container } from '@mantine/core';
import RatingBox from './rating';
// import { Link } from 'react-router-dom';
// import { Anchor } from "@mantine/core";

class Feedback extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Container size="xs" padding="xs">
                    {this.props.comment.comment}
                </Container>
                <RatingBox rating={this.props.comment.rating} dis={true} />

            </div>
        );
    }
}

export default Feedback;