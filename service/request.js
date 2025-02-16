import axios from 'axios';
import { Alert } from 'react-native';

const requestInterceptor = (config) => {
  // Add your custom logic here

  // For example, you can add an authorization header:
  const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  if (token) {
    config.headers.Authorization = "Bearer " + token.split('=')[1];
  }

  return config;
};
const responseInterceptor = (response) => {
  if(response.status >= 200 && response.status < 300){
    return response.data;
  } else {
    // Handle other error responses (non-2xx and non-400)
    console.error("Error:", response.statusText);
    // Handle other errors as needed (e.g., throw an error)
    return response;
  }
};

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(responseInterceptor, (error) => {
  console.error("Network Error:", error); // Log the network error
  try{
    if(error.response.status === 401){
      // console.log("Unauthorized! you will need to log in again.");
      // Alert.alert("Error", "Unauthorized! you will need to log in again.");
      // window.location.replace('/sign-in');
      console.table(error);
      // return Promise.reject(error.response.data);
    }
    else{
      return Promise.reject(error.response.data);
    }
  } catch(err){
    console.error(err);
    return Promise.reject({message: 'Error reaching the server. Please try again later.'})
  }
});

const request = axios;

export default request;