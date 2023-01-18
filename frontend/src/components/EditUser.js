import UserForm from "./UserForm";
import { useParams } from "react-router-dom";

const EditUser = () => {
    const { id } = useParams();

    return (
        <div>
            <UserForm uid={id} />
        </div>
    );
};

export default EditUser;
