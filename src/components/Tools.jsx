import { useEffect, useState, useContext } from 'react'
import { getCurrentlyPlaying, getAllPlaylists, deleteSongFromPlaylist, addSongToPlaylist } from '../services/spotify'
import CurrentlyPlaying from './currentlyPlaying'
import twitter from '../assets/twitter.svg'
import Playlists from './playlists'
import UserContext from '../services/context'
import DeleteFromPlaylist from './deleteFromPlaylist'
import toast from 'react-hot-toast'

const TWITTER_HANDLE = "akvashi24"
const TWITTER_LINK = "https://twitter.com/akvashi24"

export default function Tools() {
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null)
    const [playlists, setPlaylists] = useState([])
    const [pinnedPlaylist, setPinnedPlaylist] = useState(null)
    const user = useContext(UserContext)
    useEffect(
        () => {
            const reallyHighLimit = 50
            console.log('checking for user context', user)
            if (user) {
                const req = getAllPlaylists(user.id, reallyHighLimit)
                req.then(
                    result => setPlaylists(result?.data.items)
                )
                console.log(playlists)
            }
        }, [user]
    )
    console.log('playlists', playlists)
    useEffect(
        () => {
            const interval = setInterval(() => {
                const req = getCurrentlyPlaying()
                req.then(
                    result => setCurrentlyPlaying(result.data)
                )
            }, 2000)


            return () => clearInterval(interval)
        }, []
    )

    const handlePin = (mouseEvent) => {
        const [playlistId, playlistSnapshotId] = mouseEvent.currentTarget.id.split('-')
        const playlistName = mouseEvent.currentTarget.childNodes[0].innerHTML
        if (pinnedPlaylist?.id === playlistId) {
            setPinnedPlaylist(null)
        }
        else {
            setPinnedPlaylist({ id: playlistId, name: playlistName, snapshotId: playlistSnapshotId })
        }
    }


    const handlePlaylistClick = (mouseEvent) => {
        const targetPlaylistId = mouseEvent.currentTarget.id
        const targetPlaylistName = mouseEvent.currentTarget.textContent
        if (currentlyPlaying) {
            let addReq = addSongToPlaylist([currentlyPlaying.item.uri], targetPlaylistId)
            let deleteReq = deleteSongFromPlaylist([{ uri: currentlyPlaying.item.uri }], pinnedPlaylist?.id, pinnedPlaylist?.snapshotId)
            addReq.then(
                () => toast.success(`Added to ${targetPlaylistName}!`, { icon: '🎵' })
            )
            deleteReq.then(
                () => toast.success(`Deleted from ${pinnedPlaylist.name}!`, { icon: '🎵' })
            )
        }
    }

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
                    <div id='left-panel' className="flex flex-col px-12 mt-48 w-80">
                        <DeleteFromPlaylist currentSong={currentlyPlaying?.item} playlists={playlists} pinned={pinnedPlaylist} handlePin={handlePin} />
                    </div>
                    <div id="center-panel" className="flex flex-col h-full w-80">
                        <div className="pt-10 text-center">
                            <div className="flex flex-col mb-24">
                                <span className="mb-4 text-5xl font-bold tracking-tight text-white">Catalogger</span>
                            </div>
                            <div className="flex flex-col content-center w-full mx-auto overflow-wrap">
                                <CurrentlyPlaying currentlyPlaying={currentlyPlaying} />
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
                        <Playlists currentSong={currentlyPlaying?.item} playlists={playlists} handlePlaylistClick={handlePlaylistClick} />
                    </div>
                </div>
            </div >
        </div >
    )
}