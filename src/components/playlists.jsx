import { getAllPlaylists } from '../services/spotify'
import { useEffect, useState } from 'react'

export default function Playlists(props) {
    const [playlists, setPlaylists] = useState([])
    useEffect(
        () => {
            const reallyHighLimit = 50
            if (props.userId) {
                const req = getAllPlaylists(props.userId, reallyHighLimit)
                req.then(
                    result => setPlaylists(result?.data.items)
                )
            }
        }, []
    )
    console.log('playlists', playlists)
    return (
        <div className='flex flex-col w-full overflow-scroll h-3/4'>
            {
                playlists.map(playlist => {
                    return <button className="flex px-8 py-5 mb-3 font-semibold text-center text-white rounded-lg bg-neutral-700">
                        <span className="mx-auto">{playlist.name}</span>
                    </button>
                })
            }

        </div>
    )
}