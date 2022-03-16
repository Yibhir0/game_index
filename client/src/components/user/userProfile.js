
import { useParams } from "react-router-dom";
import Profile from './profile'

const UserProfile = () => {

    const { id } = useParams()

    return (
        <Profile id={id} />
    );
};


export default UserProfile;