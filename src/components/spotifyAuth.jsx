import { useSearchParams } from 'react-router-dom'
import { storeAccessToken } from '../services/api'
import { getUserDetails } from '../services/spotify'
import React, { useEffect, useState } from 'react'
import { UserProvider } from '../services/context'


export default function SpotifyAuth(props) {

    const [accessToken, setAccessToken] = useState(null)
    const [localUser, setLocalUser] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams();

    const getNewUserDetails = () => {
        const result = getUserDetails().then(
            result => {
                if (!result) {
                    console.log('damn user details failed', result);
                }
                if (result) {
                    console.log('user', result)
                    setLocalUser(result)
                }
            }
        )
    }

    const getNewAccessToken = () => {
        const code = searchParams.get('code')
        if (code != null) {
            const tokenFromAPI = storeAccessToken(code, false).then(
                result => {
                    if (!result) {
                        console.log('fuck you', result);
                    }
                    if (result) {
                        setAccessToken(result)
                    }
                }
            )
        }
    }

    useEffect(
        () => {
            let tokenFromStorage = window.localStorage.getItem('accessToken')
            if (tokenFromStorage === null) {
                getNewAccessToken()
            } else {
                setAccessToken(tokenFromStorage)
            }
            if (localUser === null) {
                getNewUserDetails()
            }
        }, []
    )

    const defaultUserContext = { user: null, email: null, displayName: null, userId: null, uri: null }

    const UserContext = React.createContext(defaultUserContext)

    return (
        <UserProvider value={localUser} >
            { props.children}
        </UserProvider >
    )
}