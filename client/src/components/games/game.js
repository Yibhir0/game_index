import { SimpleGrid, Title, Grid } from "@mantine/core";
import {
  Paper,
  ThemeIcon,
  Tooltip,
  Center,
  Loader,
  ScrollArea,
  Button,
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
  IconCashBanknote,
  IconCurrencyYen,
  IconCurrencyEuro,
  IconCurrencyDollar,
  IconMoodKid,
  IconStar,
  IconWorld,
  IconListNumbers,
  IconCalendarTime,
  IconPacman,
  IconDeviceGamepad,
  IconSword,
  IconWritingSign,
  IconPhoto,
  IconPencil,
  IconMinus,
  IconPlus,
  IconCheck,
  IconFolderPlus,
  IconEdit,
  IconX,
} from '@tabler/icons';
import { showNotification } from "@mantine/notifications";

/**
 * This component renders all games details.
 */

const Game = (props) => {

  const [addingGame, setAdd] = useState(true);
  const [selectedList, setSelectedList] = useState(0);
  const [errorMessage, setErrMessage] = useState('');
  
  useEffect(() => {
    setAdd(false);
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
    listString = props.user.lists.map((list) => list.name);
  }

  
  const updateSelectedList = (evt) => {
    if (listString.length !== 0) {
      let index = listString.indexOf(evt.currentTarget.value)
      setSelectedList(index)
    }
  }

  const addGameToList = async () => {

    if (!checkDuplicatesInList()) {
      const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
      }

      let url = "/api/users/" + props.user._id + "/list/addGame?gameId=" + props.game._id + "&index=" + selectedList;
      let response = await fetch(url, requestOptions);
      console.log(response);

      setAdd(false);

      displayNotification(
        'Game Added',
        `${props.game.name} has been successfully added to list`,
        'green',
        <IconPlus />,
      );
      await props.fetchUser();
      
    } else {
      setErrMessage("Game is already added to the selected list.");
      console.log("List already contains games");
    }
  }

  const checkDuplicatesInList = () => {
    if (props.user.lists[selectedList].games.findIndex((game) => game._id === props.game._id) >= 0) {
      return true
    } else {
      return false
    }
  }
  
  const generateTag = (title, icon, badge) => {
    return (
      <div>
        <Group spacing="xs">
          <ThemeIcon
            sx={(theme) => ({
                backgroundColor: "#374151",
            })}
          >
              {icon}
          </ThemeIcon>
          <Title
            order={4}
            sx={(theme) => ({
              color: "#374151"
            })}
          >
            {title}
          </Title>
          {badge}
        <Space h="xs" />
        </ Group>
      </div>
    )
  }
  const displayNotification = (title, desc, color, icon) => {
    showNotification({
        title: title,
        color: color,
        icon: icon,
        style: {
            backgroundColor: '#374151',
            borderColor: '#374151'
        },
        styles: (theme) => ({
            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
                color: theme.colors.red[7]
              },
        }),
        message: desc,
    })
  }
  const gameDetails = () => {

    return (
      <div>
        <Group>
          <Title
            order={1}
            sx={(theme) => ({
              color: "#242c38"
            })}
          >
            {props.game.name}
          </Title>
          { localStorage.getItem("userProfile") ? 
            <ActionIcon
              onClick={() => {
                setAdd(true)
                setSelectedList(0);
              }}
            >
              <IconPlus />
            </ActionIcon>
            :
            <></>
          }
        </Group>
        <br></br>
        <SimpleGrid cols={3}>
          <div>
            {generateTag('Publisher:', <IconPacman />, <Badge color="indigo" variant="filled">{props.game.publisher}</Badge>)}
            <Space h="md" />
            {generateTag('Platform:', <IconDeviceGamepad />, <Badge variant="filled">{platformDataUpdate(props.game.platform)}</Badge>)} 
            <Space h="md" />
            {generateTag('Genre:', <IconSword />, <Badge color="cyan" variant="filled">{props.game.genre}</Badge>)} 
            <Space h="md" />
            {generateTag('Release Year:', <IconCalendarTime/>, <Badge color="violet" variant="filled">{props.game.year}</Badge>)}
            <Space h="md" />
            {generateTag('Critic Score:', <IconStar />, returnCriticData(props.game.criticScore))}
            <Space h="md" />
            {generateTag('ESRB Rating:', <IconMoodKid/>, esrbColour(props.game.esrbrating))}
          </div>
          <div>
            {generateTag('North American Sales:', <IconCurrencyDollar/>, numberColour(props.game.naSales))}
            <Space h="md" />
            {generateTag('European Sales:', <IconCurrencyEuro/>, numberColour(props.game.euSales))}
            <Space h="md" />
            {generateTag('Japanese Sales:', <IconCurrencyYen/>, numberColour(props.game.jpSales))}
            <Space h="md" />
            {generateTag('Other Sales:', <IconCashBanknote/>, numberColour(props.game.otherSales))}
            <Space h="md" />
            {generateTag('Global Sales:', <IconWorld/>, numberColour(props.game.globalSales))}
          </div>
        </SimpleGrid>
      </div>
    );
  };

  return (
    <div>
      <Modal
        size="lg"
        opened={addingGame}
        onClose={() => {
          setAdd(false);
          setErrMessage('');
        }}
        title={'Add Game'}
      >
        {Object.keys(props.user).length !== 0 && props.user.lists.length >= 1 ?
          <div>
            <Text size="sm" weight={500}>Selected List: {props.user.lists[selectedList].name}</Text>
            <Space h="md"/>
            <ScrollArea style={{ height: 175 }}>
              {props.user.lists[selectedList].games.length >= 1 ?
                <Group>
                    {props.user.lists[selectedList].games.map((game, i) => (
                      <Tooltip withArrow label={game.name} key={i}>
                        <Image
                          style={{ paddingBottom: 130, minHeight: 100, minWidth: 100, maxWidth: 100, maxHeight: 100 }}
                          src={`https://thelemongamerindex.blob.core.windows.net/imagedata/src/main/resources/json_data/image_data/${game.image_URL[0]}`}
                        />
                      </Tooltip>
                    ))}
                </Group>
                :
                <Center style={{ width: 550, height: 175 }}>
                  <Text>List contains no games</Text>
                </Center>
                
              }
            </ScrollArea>
            <Space h="md"/>
            <NativeSelect
              data={listString}
              onChange={(evt) => {
                updateSelectedList(evt);
                setErrMessage('');
              }}
              placeholder="Select one"
              label="Select list:"
              description="Select a list to add the game to."
              error={errorMessage}
            />
          </div>
          :
          <Text>It appears you do not have any list.</Text>
        }
        {Object.keys(props.user).length !== 0 ?
          <div>
            <Space h="md"/>
            <Button
              disabled={props.user.lists.length < 1}
              className="bg-gradient-to-b from-green-700 to-green-600 hover:from-green-900 hover:to-green-800"
              onClick={() => { 
                addGameToList();
              }}
            >
              Add
            </Button>
          </div>
          :
          <></>
        }

      </Modal>

      <div className="bg-gradient-to-b from-gray-400 to-stone-100" style={{ margin: "auto", padding: 50 }}>
        <Grid columns={12}>
          <Grid.Col span={2}>
            <Image radius="sm" src={imageURL} width={200} alt={props.game.name} />
          </Grid.Col>
          <Grid.Col span={10}>
            <Text size="sm">{gameDetails()}</Text>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
};

function esrbColour(rating) {
  if (rating === "E") {
    return (<Badge color="green" variant="filled">{rating}</Badge>);

  } else if (rating === "E10") {
    return (<Badge variant="filled">{rating}</Badge>);

  } else if (rating === "T") {
    return (<Badge color="orange" variant="filled">{rating}</Badge>);

  } else if (rating === "M") {
    return (<Badge color="red" variant="filled">{rating}</Badge>);

  } else {
    return (<Badge color="gray" variant="filled">{rating}</Badge>);

  }
}

function numberColour(number) {
  if (number >= 10000000) {
    return (<Badge variant="filled">{numberWithCommas(number)}</Badge>);

  } else if (number >= 1000000) {
    return (<Badge color="green" variant="filled">{numberWithCommas(number)}</Badge>);

  } else if (number >= 100000) {
    return (<Badge color="orange" variant="filled">{numberWithCommas(number)}</Badge>);

  } else if (number >= 10000) {
    return (<Badge color="red" variant="filled">{numberWithCommas(number)}</Badge>);

  } else {
    return (<Badge color="gray" variant="filled">{numberWithCommas(number)}</Badge>);

  }

}

function returnCriticData(criticScore) {
  let criticText;
  if (criticScore === 0) {
    criticText = "Not Rated";
    return (
      <Tooltip withArrow label={"Not Rated by Critics"}>
        <Badge color="gray">{criticText}</Badge>
      </Tooltip>);
  } else {
    criticText = (<StarsRating count={5} half={true}
      value={criticScore}
      edit={false}
      size={24}
      color2={"#ffd700"}
    />);
    return (
      <Tooltip withArrow label={criticScore}>
          {criticText}
      </Tooltip>);
  }
}

function numberWithCommas(x) {
  if (x === undefined || x === 0) {
    return "None on Record";
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function platformDataUpdate(platformList) {
  let platforms = "";
  if (typeof platformList === "object" ) {
    for (let i = 0; i < platformList.length; i++) {
      if (i === platformList.length - 1) {
        platforms += platformNameUpdate(platformList[i]);
      } else {
        platforms += platformNameUpdate(platformList[i]) + ", ";
      }
    }
  }
  return platforms;
}

function platformNameUpdate(name) {
  switch(name) {
    case "WiiU":
      return "Wii U";
    case "GC":
      return "Game Cube";
    case "PSV":
      return "PS Vita";
    case "XB":
      return "Xbox";
    case "X360":
      return "Xbox 360";
    case "XOne":
      return "Xbox One";
    case "GEN":
      return "Sega Genesis";
    case "SCD":
      return "Sega CD";
    case "SAT":
      return "Sega Saturn";
    case "DC":
      return "Dreamcast";
    case "2600":
      return "Atari 2600";
    case "NG":
      return "Neo Geo";
    case "3DO":
      return "3DO Interactive Multiplayer";
    case "PCFX":
      return "PC-FX";
    case "WS":
      return "WonderSwan";
    default:
      return name;
  }
}

export default Game;
