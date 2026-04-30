import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from "react-toastify"

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const navigate = useNavigate()

    const currency = "$"
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [tutors, setTutors] = useState([])
    const [userData, setUserData] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("token") || "")

    const getTutorsData = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/api/tutor/list"
            )

            if (data.success) {
                setTutors(data.tutors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error?.message || "Error fetching tutors")
        }
    }

    const loadUserProfileData = async () => {
        try {
            if (!token) return

            const { data } = await axios.get(
                backendUrl + "/api/user/get-profile",
                { headers: { token } }
            )

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error?.message || "Error loading profile")
        }
    }

    const value = {
        tutors,
        navigate,
        currency,
        backendUrl,
        userData,
        setUserData,
        token,
        setToken,
        getTutorsData,
        loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
