import axios from 'axios';
import { message } from 'antd';

const BASE_URL = "https://xdemic-api.herokuapp.com/";

exports.post = async (data, endpoint) => {
    try {
        const add = await axios(`${BASE_URL}${endpoint}`, data);
        return new Promise((resolve, reject) => {
            if (add) resolve(add)
            else reject('an error occured while posting record! ');
        });
    } catch (error) {
        message.error(error.message);
    }
}