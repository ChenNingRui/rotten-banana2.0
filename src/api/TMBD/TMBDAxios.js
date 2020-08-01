import config from './Config';
import axios from 'axios';

//0.19 can't not handle params here, changed to 0.18
export default axios.create({
    baseURL: config.API_ROOT
});