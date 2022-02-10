import { Link } from 'react-router-dom';
import { Anchor } from '@mantine/core';
import { Component } from "react";

class TopNav extends Component{
    render() {
        return (
            <>
                <div>
                    <Anchor href="">Home</Anchor>
                    <Anchor href="">Games</Anchor>
                    <Anchor href="">Profile</Anchor>
                </div>
            </>  
          );
    }
  
}

export default TopNav;
