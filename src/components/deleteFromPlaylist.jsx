import { useState } from 'react'
import { deleteSongFromPlaylist } from '../services/spotify'

export default function DeleteFromPlaylist(props) {


    const pinnedPlaylist = (
        <button id={props.pinned ? props.pinned.id : 'placeholder'} onClick={props.handlePin} className="flex px-8 py-5 mb-3 font-semibold text-center text-white bg-red-500 rounded-lg">
            <span className="mx-auto">{props.pinned?.name}</span>
        </button>
    )

    const playlists = props.playlists.map(playlist => {
        return <button key={playlist.id} id={`${playlist.id}-${playlist.snapshot_id}`} onClick={props.handlePin} className="flex px-8 py-5 mb-3 font-semibold text-center text-white rounded-lg bg-neutral-700 hover:bg-red-500">
            <span className="mx-auto">{playlist.name}</span>
        </button>
    })

    return (
        <div className='flex flex-col w-full overflow-scroll h-3/4'>
            { props.pinned ? pinnedPlaylist : playlists}
        </div>
    )
}