import axios from 'axios'

export default () => {
    return axios.create({
        //baseURL: `https://api.drpsykoz.fr/`,
        baseURL: `http://192.168.1.50:5000/`,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}