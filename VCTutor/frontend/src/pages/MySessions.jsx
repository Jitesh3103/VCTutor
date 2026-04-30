import React, { useContext, useEffect, useState, useCallback } from 'react'
import { AppContext } from '../context/AppContext'
import axios from "axios"
import { toast } from 'react-toastify'

const MySessions = () => {

    const { currency, token, backendUrl } = useContext(AppContext)
    const [userSessions, setUserSessions] = useState([])

    const getUserSessions = useCallback(async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/api/user/sessions",
                { headers: { token } }
            )

            if (data.success) {
                setUserSessions([...data.sessions].reverse())
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }, [backendUrl, token])

    const cancelSession = async (sessionId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/cancel-session',
                { sessionId },
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)
                getUserSessions()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const sessionStripe = async (sessionId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/user/payment-stripe",
                { sessionId },
                { headers: { token } }
            )

            if (data.success) {
                window.location.assign(data.session_url)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const updatePaymentStatus = async () => {
            try {
                const currentUrl = new URL(window.location.href)
                const success = currentUrl.searchParams.get('success')
                const sessionId = currentUrl.searchParams.get('sessionId')

                if (success === "true" && sessionId) {
                    const { data } = await axios.get(
                        `${backendUrl}/api/user/verify-stripe?sessionId=${sessionId}`,
                        { headers: { token } }
                    )

                    if (data.success) {
                        toast.success('Payment successful')
                        getUserSessions()
                    }
                }

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

        if (token) updatePaymentStatus()

    }, [token, backendUrl, getUserSessions])

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                await getUserSessions()
            }
        }
        fetchData()
    }, [token, getUserSessions])

    return (
        <div className='max-padd-container py-24'>

            {userSessions.length === 0 ? (
                <p className='text-center text-gray-500'>No sessions found</p>
            ) : (
                userSessions.map((session, i) => (

                    <div key={i} className='bg-white px-6 py-4 mb-4 rounded-lg'>

                        <div className='flex items-center justify-between w-full'>

                            {/* LEFT */}
                            <div className='flex gap-x-4 items-start'>
                                <div className='h-20 w-20 overflow-hidden rounded-lg'>
                                    <img
                                        src={session.tutData?.image}
                                        alt="Tut"
                                        className='h-full w-full object-cover'
                                    />
                                </div>

                                <div className='flex flex-col gap-1 text-sm'>
                                    <h5 className='font-semibold text-base'>
                                        {session.tutData?.name}
                                    </h5>

                                    <p>{session.tutData?.qualification}</p>

                                    <p>
                                        <span className='font-medium'>Subject:</span>{" "}
                                        {session.tutData?.subject}
                                    </p>

                                    <p>
                                        <span className='font-medium'>Address:</span>{" "}
                                        {session.tutData?.address?.city},{" "}
                                        {session.tutData?.address?.country}
                                    </p>

                                    {/* ✅ Fee */}
                                    <p>
                                        <span className='font-medium'>Fee:</span>{" "}
                                        {currency} {session.tutData?.fees}
                                    </p>

                                    {/* ✅ YOUR ADDED CODE (FIXED) */}
                                    <p className="max-lg:text-[12px]">
                                        {session.slotDate}, {session.slotTime}
                                    </p>

                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="flex flex-col gap-2">

                                {/* Pay / Paid / Completed */}
                                <button
                                    onClick={() => sessionStripe(session._id)}
                                    disabled={session.payment || session.isCompleted}
                                    className={`
                                        ${session.isCompleted ? "block" : session.cancelled ? "hidden" : "block"}
                                        disabled:cursor-not-allowed
                                        ${session.payment || session.isCompleted ? "btn-ghost" : "btn-light"}
                                        px-2 py-1 text-xs rounded
                                    `}
                                >
                                    {session.isCompleted
                                        ? "Completed"
                                        : session.payment
                                            ? "Paid"
                                            : "Pay"}
                                </button>

                                {/* Cancel */}
                                <button
                                    onClick={() => cancelSession(session._id)}
                                    disabled={session.cancelled}
                                    className={`
                                        ${session.isCompleted || session.payment ? "hidden" : "block"}
                                        disabled:cursor-not-allowed
                                        ${session.cancelled ? "btn-ghost" : "btn-light"}
                                        px-2 py-1 text-xs rounded
                                    `}
                                >
                                    {session.cancelled ? "Cancelled" : "Cancel"}
                                </button>

                            </div>

                        </div>
                    </div>
                ))
            )}

        </div>
    )
}

export default MySessions