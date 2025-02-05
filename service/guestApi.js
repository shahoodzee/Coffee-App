import axios from 'axios';
import { BASE_URL } from './apiUrls';

export const login = async (requestObj) => {
    return await axios({
        method: 'POST',
        url: 'http://localhost:5000/User/signIn',
        data: requestObj
    });
}

export const signUp = async (formData) => {
    return axios({
        method: 'POST',
        url: 'http://localhost:5000/User/Create',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
