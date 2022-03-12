import { useSelector } from "react-redux";
import {Card, Avatar} from 'antd';
import moment from "moment";

const {Meta} = Card

const ConnectNav = () => {
    const {auth} =useSelector((state) => ({...state}));
    const {user} = auth;
    return(
        <div className="d-flex justify-content-areound">
            <Card>
                <Meta 
                    avatar={user.name[0]} 
                    title={user.name} 
                    description={`Joined ${moment(user.createdAt).fromNow()}`}
                />

            </Card>
        </div>
    );
};

export default ConnectNav;

