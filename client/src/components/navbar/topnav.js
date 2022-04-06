import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Group,
  Text,
  Anchor,
  Title,
  Button,
  Grid,
  Avatar,
  Image,
} from "@mantine/core";

import SignIn from "../user/signin";
import "./styles.css";
import logo from "./images/logo.png";

/**
 * This class renders the top navigation bar.
 */
class TopNav extends Component {
  render() {
    return (
        <div style={{ paddingLeft: "50px", paddingRight:"50px"}}>
        <nav>
          <Group className="topnav">
          <Title className="mr-auto"><Image src={logo} width= {200} component={Link} to={"/"}></Image></Title>
            <Button
              className="duration-200 shadow-md hover:scale-125 bg-zinc-900 hover:bg-yellow-600"
              variant="subtle"
              radius="xs"
              component={Link} to={"/"}
            >
              <Text color="white">
                Home
              </Text>
            </Button>
            <Button
              className="duration-200 shadow-md hover:scale-125 bg-zinc-900 hover:bg-yellow-600"
              variant="subtle"
              radius="xs"
              component={Link} to={"/games"}
            >
              <Text color="white">
                Games
                </Text>
            </Button>
            <SignIn className="content-end" />
          </Group>
        </nav>
      </div>
    );
  }
}

export default TopNav;
