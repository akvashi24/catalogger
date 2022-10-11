import { Track } from "./track"

export default function CurrentlyPlaying(props) {
    console.debug('current playing', props.currentlyPlaying)
    const albumArt = () => props.currentlyPlaying?.item?.album.images[0].url
    const songTitle = () => props.currentlyPlaying?.item?.name
    const albumTitle = () => props.currentlyPlaying?.item?.album.name
    const artistNames = () => props.currentlyPlaying?.item?.artists.map(artist => artist.name)

    let trackProps;
    if (props.currentlyPlaying !== null && props.currentlyPlaying?.item !== undefined) {
        trackProps = {
            albumArt: albumArt(),
            songTitle: songTitle(),
            albumTitle: albumTitle(),
            artistNames: artistNames(),
        }
    }

    if (props.currentlyPlaying === null) {
        return <div className="font-bold text-white">Loading...</div>
    }
    return <div className="flex flex-row justify-center">
        {
            props.currentlyPlaying === null || props.currentlyPlaying.item === undefined ? <div className="flex px-6 py-2 font-bold text-white bg-gray-600 rounded cursor-pointer">Nothing's playing</div> : <Track {...trackProps} />
        }

    </div>
}
