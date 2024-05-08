import { useSearchParams } from 'react-router-dom'
import { storeAccessToken } from '../services/api'
import { getUserDetails } from '../services/spotify'
import React, { useEffect, useState } from 'react'
import { UserProvider } from '../services/context'


export default function SpotifyAuth(props) {

    // eslint-disable-next-line no-unused-vars
    const [accessToken, setAccessToken] = useState(null)
    const [localUser, setLocalUser] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    const getNewUserDetails = () => {
        getUserDetails().then(
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



    useEffect(
        () => {
            const getNewAccessToken = () => {
                const code = searchParams.get('code')
                if (code != null) {
                    storeAccessToken(code, false).then(
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
            let tokenFromStorage = window.localStorage.getItem('accessToken')
            if (tokenFromStorage === null) {
                getNewAccessToken()
            } else {
                setAccessToken(tokenFromStorage)
            }
            if (localUser === null) {
                getNewUserDetails()
            }
        }, [localUser, searchParams]
    )

    return (
        <UserProvider value={localUser} >
            {props.children}
        </UserProvider >
    )
}