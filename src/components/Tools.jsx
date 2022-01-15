import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { storeAccessToken } from '../services/api'
import { getUserDetails } from '../services/spotify'
import CurrentlyPlaying from './currentlyPlaying'
import twitter from '../assets/twitter.svg'
import Playlists from './playlists'

const TWITTER_HANDLE = "akvashi24"
const TWITTER_LINK = "https://twitter.com/akvashi24"

export default function Tools() {

    let [accessToken, setAccessToken] = useState(null)
    let [user, setUser] = useState(null)
    let [searchParams, setSearchParams] = useSearchParams();

    const getNewAccessToken = () => {
        const code = searchParams.get('code')
        if (code != null) {
            const tokenFromAPI = storeAccessToken(code, false).then(
                result => {
                    if (!result) {
                        console.log('fuck you', result);
                    }
                    if (result) {
                        setAccessToken(result)
                    }
                }
            )
        }
    }

    const getNewUserDetails = () => {
        const result = getUserDetails().then(
            result => {
                if (!result) {
                    console.log('damn user details failed', result);
                }
                if (result) {
                    console.log('user', result)
                    setUser(result)
                }
            }
        )
    }

    useEffect(
        () => {
            let tokenFromStorage = window.localStorage.getItem('accessToken')
            if (tokenFromStorage === null) {
                getNewAccessToken()
            } else {
                setAccessToken(tokenFromStorage)
            }
            if (user === null) {
                getNewUserDetails()
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

    const gradient = <span className={"bg-gradient-to-br text-center from-cyan-400 to-purple-500 bg-clip-text text-transparent text-6xl font-black mb-8"}>Next.js Starterpack</span>

    return (
        <div>
            <div className="h-screen px-12 overflow-scroll text-center md:px-20 bg-zinc-900">
                <div className="flex flex-row justify-between h-full">
                    <div id='left-panel' className="w-80">

                    </div>
                    <div id="center-panel" className="flex flex-col h-full w-80">
                        <div className="pt-10 text-center">
                            <div className="flex flex-col mb-24">
                                <span className="mb-4 text-5xl font-bold tracking-tight text-white">Catalogger</span>
                            </div>
                            <div className="flex flex-col content-center w-full mx-auto overflow-wrap">
                                {accessToken !== null ? <CurrentlyPlaying /> : null}
                            </div>
                        </div>
                        <div className="flex-grow"></div>
                        <div className="flex items-center justify-center pt-4 mb-4 justify-self-end">
                            <img alt="Twitter Logo" className="h-7 w-7" src={twitter} />
                            <a
                                className="font-semibold text-zinc-100 decoration-cyan-400"
                                href={TWITTER_LINK}
                                target="_blank"
                                rel="noreferrer"
                            >{`built by @${TWITTER_HANDLE}`}</a>
                        </div>
                    </div>
                    <div id='right-panel' className="flex flex-col px-12 mt-48 w-80">
                        {user?.id ? <Playlists userId={user.id} /> : null}

                    </div>
                </div>
            </div >
        </div >
    )
}