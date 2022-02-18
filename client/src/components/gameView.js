import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Allfeedback from './allFeedback';
import FeedbackBox from './feedbackBox';

let feeds = [
    {
        "gameId": "222222222222",
        "userId": "234",
        "comment": "Nice Game",
        "rating": 3,
    },
    {
        "gameId": "222222222222",
        "userId": "234",
        "comment": "Funny",
        "rating": 3,
    },

    {
        "gameId": "124",
        "userId": "235",
        "comment": "I played this game when i was a kid",
        "rating": 2,
    },

    {
        "gameId": "125",
        "userId": "236",
        "comment": "cool game!!",
        "rating": 4,
    },

];

const GameView = () => {

    const [game, setGame] = useState({});
    const [feedback, setFeedBack] = useState([]);
    const { id } = useParams()

    useEffect(() => {


        console.log("hookie");
        const url = `/games/${id}`;

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

        //const feedbackUrl = `/games/${id}/feedback`;

        const fetchFeedback = async () => {
            // try {
            //     const response = await fetch(feedbackUrl);
            //     const json = await response.json();

            //     setFeedBack(json);
            // } catch (error) {
            //     console.log("hhdhh");
            //     console.log("error", error);
            // }
            setFeedBack(feeds);

        };
        fetchGame();
        fetchFeedback();


    });



    const addComment = (e) => {
        // Prevent the default behaviour of form submit
        e.preventDefault()

        console.log(e.target.value);
        // Get the value of the comment box
        // and make sure it not some empty strings
        const comment = e.target.elements.comment.value;

        const newComment = {
            "gameId": "222222222222",
            "userId": "234",
            "comment": comment,
            "rating": 3,
        };

        
        feeds.push(newComment);

        setFeedBack(feeds);



       
        // Get the current time.
        const timestamp = Date.now();
    
        e.target.elements.comment.value = ""

        console.log(comment+" "+ timestamp)
        
      }
    return (
        <div>
            <h1>{game.name}</h1> 
            <FeedbackBox addComment={addComment}/>
            <Allfeedback allFeedback={feedback} />
        </div>
    );
};

export default GameView;