import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Feedback from './feedback';

const GameView = () => {

    const [game, setGame] = useState({});
    const [feedback, setFeedBack] = useState([]);
    const { id } = useParams()

    useEffect(() => {
        const url = `/games/${id}`;

        const fetchGame = async () => {
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

        fetchGame();
        fetchFeedback();


    }, [id]);

    return (
        <div>
            <h1>{game.name}</h1>
            <section >
                {feedback.map((f, index) => <Feedback obj={f} key={index} />)}
            </section>
        </div>
    );
};

export default GameView;