import Header from './header'

export default function Playlists(props) {
    return (
        <div className='flex flex-col w-full overflow-scroll h-3/4'>
            <Header title='Destination Playlist'>
                Choose a playlist to send this song to
            </Header>
            {
                props.playlists.map(playlist => {
                    return <button key={playlist.id} id={playlist.id} onClick={props.handlePlaylistClick} className="flex px-8 py-5 mb-3 font-semibold text-center text-white rounded-lg bg-neutral-700 border-neutral-700 border-2 hover:border-green-600">
                        <span className="mx-auto">{playlist.name}</span>
                    </button>
                })
            }

        </div>
    )
}