import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Allfeedback from '../feedback/allFeedback';
import FeedbackBox from '../feedback/feedbackBox';
import Game from './game';
import '../feedback/styles.css'
import RatingPopUp from '../graphs/ratingPopUp'
import { Space } from '@mantine/core'

/**
 * This component renders all components
 * related to a specific game including game details, feeedback
 * ,rating, and a graph representation of number of users and with the rating.
 * @param {*} props 
 * @returns 
 */

const GameView = (props) => {

    const [currentUser, setCurrentUser] = useState({});
    const [game, setGame] = useState({});
    const [feedback, setFeedBack] = useState([]);
    let { id } = useParams()

    useEffect(() => {
        fetchUser();
        fetchGame();
        fetchFeedback();

    }, []);

    // Used to determine if a user has already commented on a game.
    const hasCommented = () => {
        let isCommented = feedback.find(item => item.userID === JSON.parse(localStorage.getItem("userProfile"))._id);
        return isCommented ? true : false;
    }

    // Used to fetch a specific game according to its ID and then set it.
    const fetchGame = async () => {
        if (props.id) {
            id = props.id
        }
        const url = `/api/games/${id}`;
        try {
            const response = await fetch(url, {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            const g = await response.json()
            setGame(g);
        } catch (error) {
            console.log("error", error);
        }
    };

    // Used to fetch a specific user and set them if they're logged in
    const fetchUser = async () => {
        if (localStorage.getItem("userProfile")) {
            let userId = JSON.parse(localStorage.getItem("userProfile"))._id;

            const url = `/api/users/${userId}`;
            try {
                const response = await fetch(url, {
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                setCurrentUser(await response.json());
            } catch (error) {
                console.log("error", error);
            }
        }
    };

    // Used to get feedback for a specific game using the game's id
    const fetchFeedback = async (data) => {
        const feedbackUrl = `/api/games/${id}/feedback`;
        try {
            const response = await fetch(feedbackUrl);
            const json = await response.json();
            if (json.length === 0) {
                setFeedBack(data);
            }
            else {
                setFeedBack(json);
            }

        } catch (error) {
            console.log("error", error);
        }
    };

    // Used to add a comment to a specifc game using the user's id
    // returns the created tags and data for the comment
    const addComment = async (values) => {
        // Get the value of the comment box
        const comment = values.comment;

        const user = JSON.parse(localStorage.getItem("userProfile"));

        const userid = user._id;
        // Get the current time.
        const newComment = {
            gameID: id,
            userID: userid,
            comment: comment,
            rating: values.rating,
        };

        const feedbackUrl = `/api/games/${id}/feedback`;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)
        };

        fetch(feedbackUrl, requestOptions)
            .then(response => response.json())
            .then(data => fetchFeedback(data));

    }

    return (
        <div className="v_flex ">
            <Game game={game} user={currentUser} fetchUser={fetchUser} />
            <Space h="lg" />
            {localStorage.getItem("userProfile") && !hasCommented() ?
                <FeedbackBox addComment={addComment} id={id} user={JSON.parse(localStorage.getItem("userProfile"))} />
                :
                <></>
            }
            <br />
            <RatingPopUp allFeedback={feedback} />
            <br />
            <Allfeedback allFeedback={feedback} />
            <Space h="lg" />
        </div>
    );
};


export default GameView;