import axios from 'axios'
const BASEURL='https://webhost.services'

export default axios.create({
    baseURL:BASEURL
})

export const axiosPrivate=axios.create({
    baseURL:BASEURL,
    headers:{
        contentType:"application/json"
    }
},
  
)