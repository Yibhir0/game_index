import { Component } from "react";
import { Container } from '@mantine/core';

// import { Link } from 'react-router-dom';
// import { Anchor } from "@mantine/core";

class Feedback extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container size="xs" padding="xs">
                {this.props.comment.comment}
            </Container>


        );
    }
}

export default Feedback;