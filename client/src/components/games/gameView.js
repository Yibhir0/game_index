import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Allfeedback from '../feedback/allFeedback';
import FeedbackBox from '../feedback/feedbackBox';

const GameView = () => {

    const [game, setGame] = useState({});
    const [feedback, setFeedBack] = useState([]);
    const { id } = useParams()

    useEffect(() => {

        console.log("hookie");
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

    const feedbackUrl = `/games/${id}/feedback`;

    const fetchFeedback = async () => {
        try {
            const response = await fetch(feedbackUrl);
            const json = await response.json();

            setFeedBack(json);
        } catch (error) {
            console.log("hhdhh");
            console.log("error", error);
        }
    };



    const addComment = async (values) => {


        // // Get the value of the comment box
        // // and make sure it not some empty strings
        const comment = values.comment;

        // // Get the current time.
        // const timestamp = Date.now();



        const newComment = {
            gameId: "222222222222",
            userId: "234",
            comment: comment,
            rating: 3,
        };

        const feedbackUrl = `/games/${id}/feedback`;

        try {
            const response = await fetch(feedbackUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newComment)
            });

            const json = await response.json();
            setFeedBack(json);

            console.log(json);

            //setFeedBack(json);
        } catch (error) {
            console.log("hhahaha");
            console.log("error", error);
        }



    }
    return (
        <div>
            <h1>{game.name}</h1>
            < FeedbackBox addComment={addComment} />
            <Allfeedback allFeedback={feedback} />
        </div>
    );
};

export default GameView;