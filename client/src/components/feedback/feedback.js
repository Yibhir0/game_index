import { Component } from "react";
import { Container, Grid, Avatar } from '@mantine/core';
import RatingBox from './rating';
import { Link } from 'react-router-dom';
import { Anchor } from "@mantine/core";
// import { Link } from 'react-router-dom';
// import { Anchor } from "@mantine/core";

class Feedback extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {

        super(props);

        this.state = {
            comment: this.props.comment,
            user: {}
        }
    }

    async componentDidMount() {
        let url = `/users/${this.state.comment.userID}`;

        let response = await fetch(url);

        let user = await response.json();

        this.setState({ user: user })

    }
    render() {
        return (
            <div >

                <Grid >

                    <Grid.Col span={2} >
                        <Anchor component={Link} to={'/profile'} >
                            <Avatar src={this.state.user.picture} />
                        </Anchor>
                    </Grid.Col>
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

export default Feedback