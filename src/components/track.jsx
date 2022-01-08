export const Track = (props) => {
    return (
        <div className="flex flex-row justify-center">
            <img src={props.albumArt} className="w-40 h-40 mr-4"></img>
            <div className="flex flex-col justify-center h-40 text-left text-white">
                <span className="font-bold">{props.songTitle}</span>
                <span>{props.albumTitle}</span>
                <span>{props.artistNames.join(', ')}</span>
            </div>
        </div>
    )
}