import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://tuongtran-videoapp.herokuapp.com/api"
})