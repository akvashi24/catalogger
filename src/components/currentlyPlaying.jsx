import { getCurrentlyPlaying } from '../services/spotify'
import { useEffect, useState } from 'react'
export default function CurrentlyPlaying() {
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null)
    useEffect(
        () => {
            const interval = setInterval(() => {
                const req = getCurrentlyPlaying()
                req.then(
                    result => setCurrentlyPlaying(result.data)
                )
            }, 1000)


            return () => clearInterval(interval)
        }, []
    )
    console.log(currentlyPlaying)
    let song = {}
    if (currentlyPlaying !== null) {
        song.albumArt = currentlyPlaying.item.album.images[0].url
        song.songTitle = currentlyPlaying.item.name
        song.albumTitle = currentlyPlaying.item.album.name
        song.artistNames = currentlyPlaying.item.artists.map(artist => artist.name)
    }
    if (currentlyPlaying === null) {
        return <div className="font-bold text-white">Loading...</div>
    }
    return <div className="flex flex-row justify-center">
        <img src={song.albumArt} className="w-40 h-40 mr-4"></img>
        <div className="flex flex-col justify-center h-40 text-left text-white">
            <span className="font-bold">{song.songTitle}</span>
            <span>{song.albumTitle}</span>
            <span>{song.artistNames.join(', ')}</span>
        </div>
    </div>
}