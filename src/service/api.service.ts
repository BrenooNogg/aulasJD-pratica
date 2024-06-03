import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2/";

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
})

const gitURL = "https://api.github.com/users/";
const gitHubApi = axios.create({
    baseURL: gitURL,
    headers: {
        "Content-Type": "application/json",
    }
})
export default {api, gitHubApi};