export const Track = (props) => {
    return (
        <div className="flex flex-col justify-center">
            <img src={props.albumArt} className="mr-4 w-80 h-80"></img>
            <div className="flex flex-col justify-center h-40 text-center text-white">
                <span className="mb-4 text-2xl font-bold">{props.songTitle}</span>
                <span className="text-xl">{props.albumTitle}</span>
                <span className="text-xl">{props.artistNames.join(', ')}</span>
            </div>
        </div>
    )
}