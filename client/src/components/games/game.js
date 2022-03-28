
import { SimpleGrid, Title, Grid } from "@mantine/core";
<<<<<<< HEAD
import { Group, ActionIcon, Avatar, Text, Accordion, Image } from "@mantine/core";
=======
import { Text, Image } from "@mantine/core";
>>>>>>> aad22902b01bf1bef6ac79f62db3bdd2b8661d14
import StarsRating from "stars-rating";
import React from "react";
import {
  IconPlus
} from '@tabler/icons';

/**
 * This component renders all games details.
 */

const Game = (props) => {
<<<<<<< HEAD

=======
  console.log(props.game);
>>>>>>> aad22902b01bf1bef6ac79f62db3bdd2b8661d14
  let imageURL;
  if (typeof props.game.image_URL !== "object") {
    imageURL =
      "https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/" +
      props.game.image_URL;
  } else {
    imageURL =
      "https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/" +
      props.game.image_URL[0];
  }
<<<<<<< HEAD

  const AccordionLabel = ({ label, description, imageURL }) => {
    return (
      <Group noWrap>
        <Avatar src={imageURL} radius="xl" />
        <div>
          <Text>{label}</Text>
          <Text size="sm" color="dimmed" weight={400}>
            {description}
          </Text>
        </div>
      </Group>
    );
  };
=======
>>>>>>> aad22902b01bf1bef6ac79f62db3bdd2b8661d14

  const gameDetails = () => {

    let platforms = "";
<<<<<<< HEAD
    if (typeof props.game.platform === "object" ) {
=======
    if (typeof props.game.platform === "object") {
>>>>>>> aad22902b01bf1bef6ac79f62db3bdd2b8661d14
      for (let i = 0; i < props.game.platform.length; i++) {
        if (i === props.game.platform.length - 1) {
          platforms += props.game.platform[i];
        } else {
          platforms += props.game.platform[i] + ", ";
        }
      }
    }

    return (
      <div>
        <Group>
          <Title order={1}>
            {props.game.name}
          </Title>
          <ActionIcon>
            <IconPlus />
          </ActionIcon>
        </Group>
        <br></br>
        <SimpleGrid cols={4}>
          <div>
            <Title order={4}>Publisher:</Title>
            <Text>{props.game.publisher}</Text>
            <Title order={4}>Platform:</Title>
            <Text>{platforms}</Text>
            <Title order={4}>Genre:</Title>
            <Text>{props.game.genre}</Text>
          </div>
          <div>
            <Title order={4}>Release Year:</Title>
            <Text>{props.game.year}</Text>
            <Title order={4}>Critic Score:</Title>
            <StarsRating
              count={5}
              half={true}
              value={props.game.criticScore}
              edit={false}
              size={24}
              color2={"#ffd700"}
            />
            <Title order={4}>ESRB Rating:</Title>
            <Text>{props.game.esrbrating}</Text>
          </div>
          <div>
            <Title order={4}>North American Sales:</Title>
            <Text>{numberWithCommas(props.game.naSales)}</Text>
            <Title order={4}>European Sales:</Title>
            <Text>{numberWithCommas(props.game.euSales)}</Text>
            <Title order={4}>Japanese Sales:</Title>
            <Text>{numberWithCommas(props.game.jpSales)}</Text>
          </div>
          <div>
            <Title order={4}>Other Sales:</Title>
            <Text>{numberWithCommas(props.game.otherSales)}</Text>
            <Title order={4}>Global Sales:</Title>
            <Text>{numberWithCommas(props.game.globalSales)}</Text>
          </div>
        </SimpleGrid>
      </div>
    );
  };

  return (
    <div style={{ margin: "auto", padding: 50 }}>
      <Grid columns={12}>
        <Grid.Col span={2}>
          <Image src={imageURL} width={200} alt={props.game.name} />
        </Grid.Col>
        <Grid.Col span={10}>
          <Text size="sm">{gameDetails()}</Text>
        </Grid.Col>
      </Grid>
    </div>
  );
};

function numberWithCommas(x) {
  if (x === undefined) {
    return "None Listed";
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default Game;
