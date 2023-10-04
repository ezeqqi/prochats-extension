import axios from "axios";

const baseURL = process.env.API_BASE_URL
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}
const api = axios.create({ baseURL, headers });
console.log('baseURL', baseURL)
api.interceptors.request.use((config) => {
  return config;
});
api.interceptors.response.use((response) => {
  return response;
});

export { api }
