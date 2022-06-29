import { useEffect, useState, useContext } from 'react'
import { getCurrentlyPlaying, getAllPlaylists, deleteSongFromPlaylist, addSongToPlaylist, skipToNext } from '../services/spotify'
import CurrentlyPlaying from './currentlyPlaying'
import twitter from '../assets/twitter.svg'
import close from '../assets/close.png'
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
                console.debug("Playlists:", playlists)
            }
        }, [user]
    )
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

    const handleDeleteAndSkip = () => {
        if (currentlyPlaying) {
            let deleteReq = deleteSongFromPlaylist([{ uri: currentlyPlaying.item.uri }], pinnedPlaylist?.id, pinnedPlaylist?.snapshotId)
            skipToNext()
            deleteReq.then(
                () => toast.success(`Deleted from ${pinnedPlaylist.name}!`, { icon: '🎵' })
            )
        }
    }


    return (
        <div>
            <div className="h-screen px-12 overflow-scroll text-center md:px-20 bg-zinc-900">
                <div className="flex flex-col justify-between h-auto sm:h-full sm:flex-row">
                    <div id='left-panel' className="flex flex-col hidden px-12 mt-48 w-80 sm:block">
                        <DeleteFromPlaylist currentSong={currentlyPlaying?.item} playlists={playlists} pinned={pinnedPlaylist} handlePin={handlePin} />
                    </div>
                    <div id="center-panel" className="flex flex-col h-full max-w-80">
                        <div className="pt-10 text-center">
                            <div className="flex flex-col mb-24">
                                <span className="mb-4 text-5xl font-bold tracking-tight text-white">Catalogger</span>
                            </div>
                            <div className="flex flex-col content-center w-full mx-auto overflow-wrap">
                                <CurrentlyPlaying currentlyPlaying={currentlyPlaying} />
                                {currentlyPlaying ?
                                    <img alt="Delete and skip" className="w-5 h-5 mt-4 ml-6 cursor-pointer" src={close} onClick={handleDeleteAndSkip} />
                                    : null
                                }
                            </div>
                        </div>
                        <div className="flex-grow"></div>
                        <div className="items-center justify-center hidden pt-4 mb-4 sm:flex justify-self-end">
                            <img alt="Twitter Logo" className="h-7 w-7" src={twitter} />
                            <a
                                className="font-semibold text-zinc-100 decoration-cyan-400"
                                href={TWITTER_LINK}
                                target="_blank"
                                rel="noreferrer"
                            >{`built by @${TWITTER_HANDLE}`}</a>
                        </div>
                    </div>
                    <div id='mobile-view-panel' className="flex flex-col px-12 mt-8 sm:hidden sm:mt-48 max-w-80">
                        <DeleteFromPlaylist currentSong={currentlyPlaying?.item} playlists={playlists} pinned={pinnedPlaylist} handlePin={handlePin} />
                    </div>
                    <div id='right-panel' className="flex flex-col h-64 px-12 mt-8 sm:mt-48 max-w-80 sm:h-auto">
                        <Playlists currentSong={currentlyPlaying?.item} playlists={playlists} handlePlaylistClick={handlePlaylistClick} />
                    </div>
                </div>
            </div >
        </div >
    )
}