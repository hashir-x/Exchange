import axios from "axios";

const call = axios.create({
    baseURL:'https://api.coingecko.com/api/v3',
})

export default call;