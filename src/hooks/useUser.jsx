import {useEffect, useState} from "react";

export const useUser = () => {
    const [actualUser, setActualUser] = useState({
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
    })

    const logOutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    const updateState = () => {
        setActualUser({
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId'),
        })
    }

    const isAuth = () => {
        return !!actualUser.token
    }

    useEffect(() => {
        window.addEventListener('storage', updateState())
        return () => window.removeEventListener('storage', updateState())
    }, []);

    return {
        id: actualUser.userId,
        token: actualUser.token,
        logOutUser,
        isAuth
    }

}