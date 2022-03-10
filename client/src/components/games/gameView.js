import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Allfeedback from '../feedback/allFeedback';
import FeedbackBox from '../feedback/feedbackBox';
import { Divider } from "@mantine/core";
import Game from './game';

const GameView = () => {

    const [game, setGame] = useState({});
    const [feedback, setFeedBack] = useState([]);
    const { id } = useParams()

    useEffect(() => {

        fetchGame();
        fetchFeedback();

    }, []);


    const fetchGame = async () => {
        const url = `/games/${id}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            setGame(json);

        } catch (error) {
            console.log("error", error);
        }
    };

    const fetchFeedback = async () => {
        const feedbackUrl = `/games/${id}/feedback`;
        try {
            const response = await fetch(feedbackUrl);
            const json = await response.json();
            console.log(json)
            setFeedBack(json);
        } catch (error) {
            console.log("error", error);
        }
    };

    const addComment = async (values) => {

        // // Get the value of the comment box
        // // and make sure it not some empty strings
        const comment = values.comment;

        const user = JSON.parse(localStorage.getItem("userProfile"));

        const userid = user._id;
        // // Get the current time.
        // const timestamp = Date.now();
        const newComment = {
            gameID: id,
            userID: userid,
            comment: comment,
            rating: values.rating,
        };

        const feedbackUrl = `/games/${id}/feedback`;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)
        };

        fetch(feedbackUrl, requestOptions)
            .then(response => response.json())
            .then(data => fetchFeedback());

    }



    if (localStorage.getItem("userProfile")) {
        return (
            <div className="v_flex">
                <Game game={game} />
                <Divider />

                <FeedbackBox addComment={addComment} id={id} />
                <Divider />
                <Allfeedback allFeedback={feedback} />
            </div>
        )
    }

    return (
        <Game game={game} />
    );
};


export default GameView;