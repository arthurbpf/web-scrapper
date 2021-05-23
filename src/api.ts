import axios from 'axios';

const api = axios.create({ baseURL: 'https://www.mises.org.br' });

export default api;
