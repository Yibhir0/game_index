
import { useParams } from "react-router-dom";
import Profile from './profile'

/**
 * 
 * @returns helper component for user id hook
 */
const UserProfile = () => {

    const { id } = useParams()

    return (
        <Profile className="bg-gradient-to-b from-gray-400 to-stone-100" id={id} />
    );
};


export default UserProfile;