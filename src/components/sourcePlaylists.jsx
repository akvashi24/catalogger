import Header from './header'

export default function SourcePlaylists(props) {
    const pinnedPlaylist = (
        <button id={props.pinned ? props.pinned.id : 'placeholder'} onClick={props.handlePin} className="flex px-8 py-5 mb-3 font-semibold text-center text-white border-2 border-red-600 rounded-lg">
            <span className="mx-auto">{props.pinned?.name}</span>
        </button>
    )

    const playlists = props.playlists.map(playlist => {
        return <button key={playlist.id} id={`${playlist.id}-${playlist.snapshot_id}`} onClick={props.handlePin} className="flex px-8 py-5 mb-3 font-semibold text-center text-white rounded-lg bg-neutral-700 border-2 border-neutral-700 hover:border-red-500">
            <span className="mx-auto">{playlist.name}</span>
        </button>
    })

    return (
        <div className='flex flex-col w-full overflow-scroll h-3/4'>
            <Header title="Source Playlist">
                {
                    props.pinned ?
                        "Deleting from this playlist" :
                        "Choose the playlist that you're listening to"
                }
            </Header>
            {props.pinned ? pinnedPlaylist : playlists}
        </div>
    )
}