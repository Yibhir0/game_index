import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Allfeedback from '../feedback/allFeedback';
import FeedbackBox from '../feedback/feedbackBox';
import Game from './game';
import '../feedback/styles.css'
import RatingPopUp from '../graphs/ratingPopUp'

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
<<<<<<< HEAD
        
        fetchUser();
        fetchGame();
=======

        fetchGame();
        //fetchUser();
>>>>>>> d6b636b6fa1c259c12433e17aa2c850a2d04b59a
        fetchFeedback();

    }, []);

    
    const hasCommented = () => {

        let isCommented = feedback.find(item => item.userID === JSON.parse(localStorage.getItem("userProfile"))._id);

        return isCommented ? true : false;
    }

    const fetchGame = async () => {
        if (props.id) {
            id = props.id
        }
        const url = `/api/games/${id}`;
        console.log(url);
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

    const fetchUser = async () => {
        if (localStorage.getItem("userProfile")) {
            let userId = JSON.parse(localStorage.getItem("userProfile"))._id;

            const url = `/api/users/${userId}`;
            console.log(url);
            try {
                const response = await fetch(url, {
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                setCurrentUser(await response.json());
                console.log("logged in");
            } catch (error) {
                console.log("error", error);
            }
        } else {
            console.log("not logged in");
        }
    };

    const fetchFeedback = async () => {
        const feedbackUrl = `/api/games/${id}/feedback`;
        try {
            const response = await fetch(feedbackUrl);
            const json = await response.json();
            setFeedBack(json);
        } catch (error) {
            console.log("error", error);
        }
    };

    const addComment = async (values) => {

        // // Get the value of the comment box
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

        const feedbackUrl = `/api/games/${id}/feedback`;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)
        };

        fetch(feedbackUrl, requestOptions)
            .then(response => response.json())
            .then(data => fetchFeedback());

    }

    return (
        <div className="v_flex bg-stone-100">
            <Game game={game} user={currentUser} />
            <br />
            { localStorage.getItem("userProfile") && !hasCommented() ?
                <FeedbackBox addComment={addComment} id={id} user={JSON.parse(localStorage.getItem("userProfile"))} />
                :
                <></>
            }
            <br />
            <RatingPopUp allFeedback={feedback} />
            <br />
            <Allfeedback allFeedback={feedback} />
        </div>
    );
};


export default GameView;