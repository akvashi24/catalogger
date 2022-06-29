export const Track = (props) => {
    return (
        <div className="flex flex-col justify-center">
            <img src={props.albumArt} className="object-cover mx-auto mb-6 max-w-80 max-h-80"></img>
            <div className="flex flex-col justify-center text-left text-white">
                <span className="text-2xl font-bold ">{props.songTitle}</span>
                <span className="text-gray-300 text-l">{props.albumTitle}</span>
                <span className="text-gray-300 text-g">{props.artistNames.join(', ')}</span>
            </div>
        </div>
    )
}