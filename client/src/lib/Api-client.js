import axios from 'axios'
import { HOST } from '../utils/constants'



export const apiClient = axios.create({
    headers :{        
        "Access-Control-Allow-Origin": '*',   
    },
    baseURL : HOST,    
})