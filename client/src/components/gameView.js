import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const GameView = () => {

    const [game, setGame] = useState("");

    const { id } = useParams()

    useEffect(() => {
        const url = `/games/${id}`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();

                setGame(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            {game.name}
        </div>
    );
};

export default GameView;