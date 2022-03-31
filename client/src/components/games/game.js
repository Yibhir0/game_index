
import { SimpleGrid, Title, Grid } from "@mantine/core";
import {
  NativeSelect,
  Space,
  Badge,
  Group,
  ActionIcon,
  Text,
  Image,
  Modal,
} from "@mantine/core";
import StarsRating from "stars-rating";
import { React, useEffect, useState } from "react";
import {
  IconPlus
} from '@tabler/icons';

/**
 * This component renders all games details.
 */

const Game = (props) => {
  // console.log(props.user);
  const [addingGame, setAdd] = useState(true);
  const [selectedList, setSelectedList] = useState(true);
  
  useEffect(() => {
    setAdd(false);
    setSelectedList(0);
  }, [])

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

  let listString;
  if (Object.keys(props.user).length !== 0) {
    listString = props.user.lists.map((list) => list.name)  
  }

  const updateSelectedList = (evt) => {
    console.log(evt.currentTarget.value);
  }
  
  const gameDetails = () => {

    let platforms = "";
    if (typeof props.game.platform === "object" ) {
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
          { localStorage.getItem("userProfile") ? 
            <ActionIcon
              onClick={() => setAdd(true)}
            >
              <IconPlus />
            </ActionIcon>
            :
            <></>
          }
        </Group>
        <br></br>
        <SimpleGrid cols={4}>
          <div>
            <Title order={4}>Publisher:</Title>
            <Badge color="indigo" variant="filled">{props.game.publisher}</Badge>
            <Space h="md" />
            <Title order={4}>Platform:</Title>
            <Badge variant="filled">{platforms}</Badge>
            <Space h="md" />
            <Title order={4}>Genre:</Title>
            <Badge color="cyan" variant="filled">{props.game.genre}</Badge>
          </div>
          <div>
            <Title order={4}>Release Year:</Title>
            <Badge color="violet" variant="filled">{props.game.year}</Badge>
            <Space h="md" />
            <Title order={4}>Critic Score:</Title>
            <Badge color="gray">{returnCriticData(props.game.criticScore)}</Badge>
            <Space h="md" />
            <Title order={4}>ESRB Rating:</Title>
            <Badge color="teal" variant="filled">{props.game.esrbrating}</Badge>
          </div>
          <div>
            <Title order={4}>North American Sales:</Title>
            <Badge color="yellow" variant="filled">{numberWithCommas(props.game.naSales)}</Badge>
            <Space h="md" />
            <Title order={4}>European Sales:</Title>
            <Badge color="orange" variant="filled">{numberWithCommas(props.game.euSales)}</Badge>
            <Space h="md" />
            <Title order={4}>Japanese Sales:</Title>
            <Badge color="red" variant="filled">{numberWithCommas(props.game.jpSales)}</Badge>
          </div>
          <div>
            <Title order={4}>Other Sales:</Title>
            <Badge color="pink" variant="filled">{numberWithCommas(props.game.otherSales)}</Badge>
            <Space h="md" />
            <Title order={4}>Global Sales:</Title>
            <Badge color="grape" variant="filled">{numberWithCommas(props.game.globalSales)}</Badge>
          </div>
        </SimpleGrid>
      </div>
    );
  };

  return (
    <div>
      <Modal
        opened={addingGame}
        onClose={() => setAdd(false)}
        title={'Add Game'}
      >
        <NativeSelect
          data={listString}
          onChange={(evt) => updateSelectedList(evt)}
          placeholder="Select one"
          label="Select list:"
          description="Select a list to add the game to."
        />
      </Modal>

      <div className="bg-gradient-to-b from-gray-400 to-stone-100" style={{ margin: "auto", padding: 50 }}>
        <Grid columns={12}>
          <Grid.Col span={2}>
            <Image src={imageURL} width={200} alt={props.game.name} />
          </Grid.Col>
          <Grid.Col span={10}>
            <Text size="sm">{gameDetails()}</Text>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
};

function returnCriticData(criticScore) {
  if (criticScore === 0) {
      return (<Text>Not Rated</Text>);

  }
  return (<StarsRating count={5} half={true}
    value={criticScore}
    edit={false}
    size={24}
    color2={"#ffd700"}
  />);
}

function numberWithCommas(x) {
  if (x === undefined || x === 0) {
    return "None on Record";
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default Game;
