import axios from 'axios'
const instance=axios.create({
    baseURL:'https://node-js-message.herokuapp.com/',
})
export default instance;