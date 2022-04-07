import { Component } from "react";
import { Container, Grid, Avatar } from '@mantine/core';
import RatingBox from './rating';
import { Link } from 'react-router-dom';
import {
    Text,
    Anchor,
    Space,
} from "@mantine/core";
import StarsRating from "stars-rating";

import './styles.css';


/**
 * Component renders one feedback with the associated user
 */
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
        let url = `/api/users/${this.state.comment.userID}`;

        let response = await fetch(url);

        let user = await response.json();

        this.setState({ user: user })

    }
    render() {
        return (
            <Container className="commentBox" >
                <Grid className="commentText">
                    <Grid.Col span={2} >
                        <Space h="sm"/>
                        <Anchor
                            
                            component={Link}
                            to={`/profile/${this.state.comment.userID}`} >
                            <Avatar src={this.state.user.picture} />
                            <Space h="md"/>
                            <Text className="underline text-yellow-500 hover:decoration-yellow-500"
                            >
                                {this.state.user.name}
                            </Text>
                        </Anchor>

                    </Grid.Col>
                    <Grid.Col span={8} >
                        <Space h="sm"/>
                        {this.props.comment.comment}
                        <Space h="md"/>
                        <StarsRating count={5} half={true}
                            value={this.props.comment.rating}
                            edit={false}
                            size={24}
                            color2={"#ffd700"}
                        />
                    </Grid.Col>
                </Grid>
                <br />
            </Container>
        );
    }
}
export default Feedback