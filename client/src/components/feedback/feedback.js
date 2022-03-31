import { Component } from "react";
import { Container, Grid, Avatar } from '@mantine/core';
import RatingBox from './rating';
import { Link } from 'react-router-dom';
import {
  Text,
  Anchor
} from "@mantine/core";

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
        <Grid >
          <Grid.Col span={2} >
            <Anchor component={Link} to={`/profile/${this.state.comment.userID}`} >
              <Avatar src={this.state.user.picture} />
              <Text>
                {this.state.user.name}
              </Text>
            </Anchor>

          </Grid.Col>
          <Grid.Col span={8} className="commentText">
            {this.props.comment.comment}
          </Grid.Col>
          <Grid.Col span={2}>
            <RatingBox rating={this.props.comment.rating} dis={true} />
          </Grid.Col>
        </Grid>
        <br />
      </Container>
    );
  }
}
export default Feedback