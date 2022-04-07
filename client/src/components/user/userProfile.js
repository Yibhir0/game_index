
import { useParams } from "react-router-dom";
import Profile from './profile'
/**
 * 
 * @returns helper component for user id hook
 */
const UserProfile = () => {

    const { id } = useParams()

   

    return (
        <Profile id={id} />
    );
};


export default UserProfile;