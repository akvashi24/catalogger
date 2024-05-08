export const Track = (props) => {
    return (
        <div className="flex flex-col justify-center max-w-40 sm:max-w-auto">
            <img src={props.albumArt} alt={props.albumTitle || 'Album Art'} className="object-cover mx-auto mb-6 sm:max-w-80 sm:max-h-80 max-w-40 max-h-40"></img>
            <div className="flex flex-col justify-center text-left text-white">
                <span className="text-2xl font-bold ">{props.songTitle}</span>
                <span className="text-gray-300 text-l">{props.albumTitle}</span>
                <span className="text-gray-300 text-g">{props.artistNames ? props.artistNames.join(', ') : '-'}</span>
            </div>
        </div>
    )
}
