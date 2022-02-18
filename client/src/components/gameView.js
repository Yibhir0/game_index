import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Feedback from './feedback';
import { Textarea } from '@mantine/core';

const GameView = () => {

    const [game, setGame] = useState({});
    const [feedback, setFeedBack] = useState([]);
    const { id } = useParams()

    useEffect(() => {
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

                setFeedBack(json);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchGame();
        fetchFeedback();


    });



    return (
        <div>
            <h1>{game.name}</h1>
            <Textarea
                placeholder="Your comment"
                label="Your comment"
            />
            <section >
                {feedback.map((f, index) => <Feedback obj={f} key={index} />)}
            </section>

        </div>
    );
};

export default GameView;