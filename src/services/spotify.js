
import axios from "axios";
import { checkRefresh, logErrors } from "./api"

const spotifyURL = "https://api.spotify.com/v1/"

const spotify = axios.create({
    baseURL: spotifyURL
})

spotify.defaults.headers.common['Content-Type'] = 'application/json';


const getConfig = () => {
    checkRefresh()
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


export const playHeat = async () => {
    const config = getConfig()
    const path = spotifyURL + 'me/player/play'
    const payload = { "context_uri": 'spotify:user:7832d6291d614118:playlist:4TvnzPNK0JQ1mOQyeLQgAG?si=8b02185844d04386' }
    config.data = payload
    console.log(config)
    const result = spotify.put(path, config.data, config).catch(error => {
        // TODO: (akv) this doesn't work if the endpoint doesn't exist
        logErrors(error);
        return false;
    })
    return result
}