import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://oauth.reddit.com'
})
export default axios