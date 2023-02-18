import axios from 'axios';
// import Config from "react-native-config";
export const BACKEND_URL =
    'http://ec2-3-35-25-21.ap-northeast-2.compute.amazonaws.com:3000/api/';


const token = 'abc'


export const getUsers = async () => {
    const res = await axios.get(
        BACKEND_URL + `users`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    if (res) {
        return res.data;
    }
};

export const getUserByUuid = async (uuid:string) => {
    const res = await axios.get(
        BACKEND_URL + `users?uuid=${uuid}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    if (res) {
        return res.data;
    }
}
