import axios from 'axios';

export const devServer = 'http://localhost:8081/';

export const prodServer = 'https://oxfordunichess.github.io/oucc-backend/';

export const server = process.env.NODE_ENV === 'development' ? devServer : prodServer;

axios.defaults.baseURL = server;

export default axios;