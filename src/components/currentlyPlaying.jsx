import { getCurrentlyPlaying, playHeat } from '../services/spotify'
import { useEffect, useState } from 'react'
import { Track } from "./track"
export default function CurrentlyPlaying() {
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null)
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
    console.log(currentlyPlaying)
    const albumArt = () => currentlyPlaying?.item?.album.images[0].url
    const songTitle = () => currentlyPlaying?.item?.name
    const albumTitle = () => currentlyPlaying?.item?.album.name
    const artistNames = () => currentlyPlaying?.item?.artists.map(artist => artist.name)

    let trackProps;
    if (currentlyPlaying !== null && currentlyPlaying.item !== undefined) {
        trackProps = {
            albumArt: albumArt(),
            songTitle: songTitle(),
            albumTitle: albumTitle(),
            artistNames: artistNames(),
        }
    }

    const handlePlayHeat = () => {
        playHeat()
    }

    if (currentlyPlaying === null) {
        return <div className="font-bold text-white">Loading...</div>
    }
    return <div className="flex flex-row justify-center">
        {
            currentlyPlaying === null || currentlyPlaying.item === undefined ? <div className="flex px-6 py-2 font-bold text-white bg-gray-600 rounded cursor-pointer">Nothing's playing</div> : <Track {...trackProps} />
        }

    </div>
}