import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { setAccessToken } from '../services/api'

const TWITTER_HANDLE = "akvashi24"
const TWITTER_LINK = "https://twitter.com/akvashi24"

export default function Home() {

    const redirectUri = process.env.NODE_ENV === "development" ? "http://localhost:3000/tools" : process.env.NODE_ENV === "production" ? "https://catalogger-blush.vercel.app/tools" : ""

    const allSpotifyScopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-email user-follow-modify user-follow-read user-library-modify user-library-read streaming app-remote-control user-read-playback-position user-top-read user-read-recently-played playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public'

    const initialAuthPayload = {
        "response_type": 'code',
        "client_id": '85eb0f316898426ebe2784fdfa453363',
        "scope": allSpotifyScopes,
        "redirect_uri": redirectUri,
        "state": ''
    }
    var queryString = Object.keys(initialAuthPayload).map(key => key + '=' + initialAuthPayload[key]).join('&');
    const spotifyURL = 'https://accounts.spotify.com/authorize?' + queryString

    const gradient = <span className={"bg-gradient-to-br text-center from-cyan-400 to-purple-500 bg-clip-text text-transparent text-6xl font-black mb-8"}>Next.js Starterpack</span>

    const handleClear = () => {
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('expiresAt')
    }

    const accessToken = window.localStorage.getItem('accessToken')

    return (
        <div>
            <div className="h-screen overflow-scroll text-center bg-zinc-900">
                <div className="flex flex-col justify-between h-full bg-zinc-900">
                    <div className="pt-40 text-center bg-zinc-900">
                        <div className="flex flex-col mb-20">
                            <span className="mb-4 text-5xl font-bold tracking-tight text-white">Catalogger</span>
                            <span className="text-gray-400 text tracking-ight">Simple Spotify tools like unliking in bulk, liking all playlist, and more.</span>
                        </div>
                        <div className="flex content-center w-1/2 mx-auto mb-4 overflow-wrap">
                            <div className="flex items-center px-8 py-2 mx-auto text-xl font-semibold text-white rounded-lg bg-spotify-green">
                                <a className="mx-auto" href={accessToken === null ? spotifyURL : '/tools'}>
                                    {accessToken === null ? "Connect to Spotify" : "Go to Tools"}
                                </a>
                            </div>
                        </div>
                        <div className="flex content-center w-1/2 mx-auto overflow-wrap">
                            <button onClick={handleClear} className="flex items-center px-8 py-2 mx-auto text-xl font-semibold text-white bg-red-500 rounded-lg">
                                Clear
                                </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center pt-4 mb-4">
                        <img alt="Twitter Logo" className="h-7 w-7" src="/icons/twitter-logo.svg" />
                        <a
                            className="font-semibold text-zinc-100 decoration-cyan-400"
                            href={TWITTER_LINK}
                            target="_blank"
                            rel="noreferrer"
                        >{`built by @${TWITTER_HANDLE}`}</a>
                    </div>
                </div>
            </div >
        </div >
    )
}