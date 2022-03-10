
import GoogleLogin, { GoogleLogout } from 'react-google-login';

import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Anchor } from "@mantine/core";
import './styles.css'
export default function SignIn() {

    const [userAccount, setUserAccount] = useState(JSON.parse(localStorage.getItem('userProfile')));

    /**
 * Handle login with google. This function sends
 * a post request to the server with google tokenId
 * @param {} googleData 
 */
    const handleLogin = async googleData => {

        console.log(googleData);

        try {
            const res = await fetch("/users/login", {
                method: "POST",
                body: JSON.stringify({
                    token: googleData.tokenId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()

            localStorage.setItem('userProfile', JSON.stringify(data));

            setUserAccount(data);

            alert("You are successfully logged in ")
            window.location.reload(false);
            //Logged in
        }
        catch (err) {
            // Not login 
        }

        // store returned user somehow
    }

    const handleLogout = async response => {
        // const res = await fetch("/users/logout", {
        //     method: "DELETE",
        // })
        // const data = await res.json()
        // console.log(data);
        localStorage.clear();
        setUserAccount(null);

        alert("You are successfully logged out ")
        window.location.reload(false);
    }


    function UserLogIn() {

        return (
            <div>
                <Anchor component={Link} to={'/profile'} >
                    {userAccount.name}
                </Anchor>
                <GoogleLogout className='linkbtn'
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={handleLogout}
                />
            </div>
        )

    }

    function Guest() {
        return (

            <div>
                <GoogleLogin className='linkbtn'
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Log in with Google"
                    onSuccess={handleLogin}
                    onFailure={handleLogin}
                    cookiePolicy={'single_host_origin'}
                />

            </div>
        )
    }

    if (userAccount) {
        return <UserLogIn />
    }
    return <Guest />


}

