import { Component } from "react";


// import { Link } from 'react-router-dom';
// import { Anchor } from "@mantine/core";

class Feedback extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <article >
                {this.props.comment.comment}
            </article>
        );
    }
}

export default Feedback;