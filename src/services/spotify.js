
import axios from "axios";
import { checkRefresh, logErrors } from "./api"

const spotifyURL = "https://api.spotify.com/v1/"

const spotify = axios.create({
    baseURL: spotifyURL
})

spotify.defaults.headers.common['Content-Type'] = 'application/json';


const getConfig = () => {
    // checkRefresh()
    const accessToken = window.localStorage.getItem('accessToken')
    const config = { headers: { 'Authorization': `Bearer ${accessToken}` } }
    return config
}

export const getCurrentlyPlaying = async (code) => {
    const config = getConfig()
    const path = spotifyURL + 'me/player/currently-playing'
    const result = spotify.get(path, config).catch(error => {
        // TODO: (akv) this doesn't work if the endpoint doesn't exist
        logErrors(error);
        return false;
    })
    return result
}