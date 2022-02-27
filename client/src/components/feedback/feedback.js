import { Component } from "react";
import { Container, Grid, Avatar } from '@mantine/core';
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

                <Grid >
                    <Grid.Col span={2} >
                        <Avatar radius="xl" /></Grid.Col>
                    <Grid.Col span={8}>
                        {this.props.comment.comment}
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <RatingBox rating={this.props.comment.rating} dis={true} />
                    </Grid.Col>

                </Grid>


            </div>
        );
    }
}

export default Feedback;