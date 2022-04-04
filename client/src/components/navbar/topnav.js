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
          <Title className="mr-auto"><Image src={logo} width= {250} component={Link} to={"/"}></Image></Title>
            <Button
              className="bg-gradient-to-b from-gray-700 to-gray-600"
              variant="subtle"
              radius="xs"
              component={Link} to={"/"}
            >
              <Anchor className="text-white" component={Link} to={"/"}>
                Home
              </Anchor>
            </Button>
            <Button
              className="bg-gradient-to-b from-gray-700 to-gray-600"
              variant="subtle"
              radius="xs"
              component={Link} to={"/games"}
            >
              <Anchor className="text-white" component={Link} to={"/games"}>
                Games
              </Anchor>
            </Button>
            <SignIn className="content-end" />
          </Group>
        </nav>
      </div>
    );
  }
}

export default TopNav;
