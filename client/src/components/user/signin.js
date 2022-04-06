
import GoogleLogin, { GoogleLogout } from 'react-google-login';

import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
    Text,
    Button,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import './styles.css'
import { useNavigate } from "react-router-dom";
import { IconLogout, IconLogin } from "@tabler/icons";
export default function SignIn() {

    const [userAccount, setUserAccount] = useState(JSON.parse(localStorage.getItem('userProfile')));
    //variable will change later for deployment
    // const profileUrl = "/profile";
    let navigate = useNavigate();
    /**
 * Handle login with google. This function sends
 * a post request to the server with google tokenId
 * @param {} googleData 
 */
    const handleLogin = async googleData => {

        console.log("heLLO ID " + process.env.REACT_APP_GOOGLE_CLIENT_ID);

        try {
            const res = await fetch("/api/users/login", {
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

            navigate(`/profile/${data._id}`, { replace: true });

            displayNotification(
                'Logged in',
                "You have successfully logged in",
                'green',
                <IconLogin />
            )

            //Logged in
        }
        catch (err) {
            alert("You are not logged in.. Try again ")
        }


    }
    // Logout user g
    const handleLogout = async response => {
        const res = await fetch("/api/users/logout", {
            method: "DELETE",
        })
        const data = await res.json()

        localStorage.clear();
        setUserAccount(null);

        // if (window.location.pathname.includes(profileUrl)) {
        //     window.location.reload(true);
        // }

        displayNotification(
            'Logged out',
            "You have successfully logged out",
            'orange',
            <IconLogout />
        )

        navigate("/", { replace: true });

    }

    function displayNotification(title, desc, color, icon){
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

    // Login user
    function UserLogIn() {
        return (
            <div className="topnav">
                <Button className="duration-200 shadow-md hover:scale-125 bg-zinc-900 hover:bg-yellow-600" variant="subtle" radius="xs" component={Link} to={`/profile/${userAccount._id}`}>
                    <Text color="white">
                        Profile
                    </Text>
                </Button>

                <Button className="bg-transparent hover:bg-transparent" variant="subtle" radius="xs">
                    <GoogleLogout
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={handleLogout}
                    />
                </Button>


            </div>
        )

    }

    function Guest() {
        return (

            <Button className="bg-transparent hover:bg-transparent" variant="subtle" radius="xs">
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Log in "
                    onSuccess={handleLogin}
                    onFailure={handleLogin}
                    cookiePolicy={'single_host_origin'}
                />
            </Button>

        )
    }

    if (userAccount) {
        return <UserLogIn />
    }
    return <Guest />


}

