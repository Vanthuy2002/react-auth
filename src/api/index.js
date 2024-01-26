import axios from 'axios'
const BASE_URL = 'https://my-twitter-api.online'
const api = axios.create({
  baseURL: BASE_URL
})

const apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})
export default api
export { apiPrivate }
