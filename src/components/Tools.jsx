import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { storeAccessToken } from '../services/api'
import CurrentlyPlaying from './currentlyPlaying'
const TWITTER_HANDLE = "akvashi24"
const TWITTER_LINK = "https://twitter.com/akvashi24"

export default function Tools() {

    let [accessToken, setAccessToken] = useState(null)
    let [currentlyPlaying, setCurrentlyPlaying] = useState(null)
    let [searchParams, setSearchParams] = useSearchParams();
    useEffect(
        () => {
            let tokenFromStorage = window.localStorage.getItem('accessToken')
            if (tokenFromStorage === null) {
                const code = searchParams.get('code')
                if (code != null) {
                    const tokenFromAPI = storeAccessToken(code).then(
                        result => { console.log('fuck you', result); setAccessToken(result) }
                    )
                }
            } else {
                setAccessToken(tokenFromStorage)
            }
        }, []
    )
    const button = (text, success) => {
        let result = (
            <div className={"flex items-center px-4 py-2 text-xl font-semibold text-white rounded-lg " + (success ? "bg-spotify-green" : "bg-red-500")}>
                {text}
            </div>
        )
        return result
    }

    console.log('after fetching', accessToken)

    const gradient = <span className={"bg-gradient-to-br text-center from-cyan-400 to-purple-500 bg-clip-text text-transparent text-6xl font-black mb-8"}>Next.js Starterpack</span>

    return (
        <div>
            <div className="h-screen px-40 overflow-scroll text-center bg-zinc-900">
                <div className="flex flex-col h-full bg-zinc-900">
                    <div className="flex flex-row-reverse px-4 py-5 h-15">
                        {accessToken ? button("Logged in", true) : button("Shit's fucked?", false)}
                    </div>
                    <div className="pt-10 text-center bg-zinc-900">
                        <div className="flex flex-col mb-20">
                            <span className="mb-4 text-5xl font-bold tracking-tight text-white">Catalogger</span>
                            <span className="text-gray-400 text tracking-ight">Simple Spotify tools like unliking in bulk, liking all playlist, and more.</span>
                        </div>
                        <div className="flex flex-col content-center w-full mx-auto overflow-wrap">
                            {accessToken !== null ? <CurrentlyPlaying /> : null}
                        </div>
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex items-center justify-center pt-4 mb-4 justify-self-end">
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