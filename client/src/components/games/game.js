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
  
  //sets the variables for adding games, selecting list and displaying error messages
  const [addingGame, setAdd] = useState(true);
  const [selectedList, setSelectedList] = useState(0);
  const [errorMessage, setErrMessage] = useState('');
  
  //addingGame is set to false
  useEffect(() => {
    setAdd(false);
  }, [])

  //verifies if image_URL is not an object, if not then assign the variable
  //else, it is an array, then the first index needs to be added
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

  //verifies if user exist, then make an array of strings with list names
  let listString;
  if (Object.keys(props.user).length !== 0) {
    listString = props.user.lists.map((list) => list.name);
  }

  
  /**
   * update the selected list whenever a user selects a list
   * @param {*} evt event
   */
  const updateSelectedList = (evt) => {

    //verifies if the array of list strings is not empty
    if (listString.length !== 0) {
      let index = listString.indexOf(evt.currentTarget.value)
      setSelectedList(index)
    }
  }

  /**
   * add game to specific list to database
   */
  const addGameToList = async () => {

    //verifies if list contains duplicates
    if (!checkDuplicatesInList()) {
      const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
      }
      
      //add game to specific list in database
      let url = "/api/users/" + props.user._id + "/list/addGame?gameId=" + props.game._id + "&index=" + selectedList;
      let response = await fetch(url, requestOptions);

      //close add game window
      setAdd(false);
      
      //display notification that game has been succesfully added to list
      displayNotification(
        'Game Added',
        `${props.game.name} has been successfully added to list`,
        'green',
        <IconPlus />,
      );
      
      //fetch user information to update the view
      await props.fetchUser();
      
    } else {
      //display error message if game is already added to selected list
      setErrMessage("Game is already added to the selected list.");
    }
  }

  /**
   * check game duplicates in list
   * @returns if list contain game duplicates
   */
  const checkDuplicatesInList = () => {
    if (props.user.lists[selectedList].games.findIndex((game) => game._id === props.game._id) >= 0) {
      return true
    } else {
      return false
    }
  }
  
  /**
   * generateTag generate tags containing game information with icon
   * @param {*} title game property
   * @param {*} icon icon
   * @param {*} badge mantine badge 
   * @returns game information with icon
   */
  const generateTag = (title, icon, badge) => {
    return (
      <div>
        <Group spacing="xs">
          <ThemeIcon
            variant="light"
            color="dark"
          >
              {icon}
          </ThemeIcon>
          <Title
            order={4}
          >
            {title}
          </Title>
          {badge}
        <Space h="xs" />
        </ Group>
      </div>
    )
  }

  /**
   * displayNotification creates a notification
   * @param {*} title notification title
   * @param {*} desc notification description
   * @param {*} color icon color
   * @param {*} icon notification icon
   */
  const displayNotification = (title, desc, color, icon) => {

    //function from mantine to show notifications
    showNotification({
        title: title,
        color: color,
        icon: icon,
        style: {
            backgroundColor: '#18181b',
            borderColor: '#18181b'
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

  /**
   * gameDetails renders the details of the game, this includes all the details of a game as well as the image
   * @returns rendered component of the game details
   */
  const gameDetails = () => {
    return (
      <div>
        <Group>
          <Title
            order={1}
            sx={(theme) => ({
              color: "#f5f6fa"
            })}
          >
            {props.game.name}
          </Title>
          { localStorage.getItem("userProfile") ? 
            <ActionIcon
              className="text-white bg-gradient-to-b from-yellow-700 to-yellow-500 hover:from-yellow-900 hover:to-yellow-700"
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
        {/* Generate all the game data for the view */}
        <SimpleGrid cols={3}>
          <div>
            {generateTag('Genre:', <IconSword />, <Badge color="cyan" variant="light">{props.game.genre}</Badge>)} 
            <Space h="md" />
            {generateTag('Platform:', <IconDeviceGamepad />, <Badge variant="light">{platformDataUpdate(props.game.platform)}</Badge>)} 
            <Space h="md" />
            {generateTag('Publisher:', <IconPacman />, <Badge color="indigo" variant="light">{props.game.publisher}</Badge>)}
            <Space h="md" />
            {generateTag('Release Year:', <IconCalendarTime/>, <Badge color="violet" variant="light">{props.game.year}</Badge>)}
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

  //the data the game component returns
  return (
    <div>
      {/* Pop up for adding game to a specific list*/}
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
              {/* verifies if list is not empty, if it is then display no games in list to user */}
              {props.user.lists[selectedList].games.length >= 1 ?
                <Group>
                  {/* map all of the games in the selected list to display the content to the user */}
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
            <Space h="md" />
            
            {/* Button to add game to specific list */}
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
      <Space h="md" />
      
      {/* Container containg game details and the image */}
      <div className="shadow-md bg-gradient-to-b from-zinc-900 to-zinc-800" style={{ margin: "auto", padding: 50 }}>
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

/**
 * Function used to stylise the rating values.
 * Different colours were chosen to highlight rating's
 * age group splits accordingly.
 **/
function esrbColour(rating) {
  if (rating === "E") {
    return (<Badge color="green" variant="light">{rating}</Badge>);

  } else if (rating === "E10") {
    return (<Badge variant="light">{rating}</Badge>);

  } else if (rating === "T") {
    return (<Badge color="orange" variant="light">{rating}</Badge>);

  } else if (rating === "M") {
    return (<Badge color="red" variant="light">{rating}</Badge>);

  } else {
    return (<Badge color="gray" variant="light">{rating}</Badge>);

  }
}

/**
 * Function used to stylise the sale values.
 * Different colours were chosen to highlight sales acheivements.
 **/
function numberColour(number) {
  if (number >= 10000000) {
    return (<Badge variant="light">{numberWithCommas(number)}</Badge>);

  } else if (number >= 1000000) {
    return (<Badge color="green" variant="light">{numberWithCommas(number)}</Badge>);

  } else if (number >= 100000) {
    return (<Badge color="orange" variant="light">{numberWithCommas(number)}</Badge>);

  } else if (number >= 10000) {
    return (<Badge color="red" variant="light">{numberWithCommas(number)}</Badge>);

  } else {
    return (<Badge color="gray" variant="light">{numberWithCommas(number)}</Badge>);

  }

}

/**
 * Function used to stylise cirtic score data.
 * Converts a numerical score into a five-star rating system.
 * Adds a tooltip to show the numerical score to the user upon hover. 
 **/
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

/**
 * Function used to make the large numbers display with commas separating 
 * the numbers positions (1000000 => 1,000,000) 
 **/
function numberWithCommas(x) {
  if (x === undefined || x === 0) {
    return "None on Record";
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Function used to display the platforms in a comma separated string
 **/
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

/**
 * Function used to make some of the platform names prettier to users 
 **/
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
