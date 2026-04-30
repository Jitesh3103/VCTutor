import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { AdminContext } from '../../context/AdminContext'

const AllSessions = () => {

  const { sessions, getAllSessions, aToken, cancelSession } = useContext(AdminContext)
  const { currency, calculateAge } = useContext(AppContext)

  const sessionStripe = (id) => console.log("Pay:", id)

  useEffect(() => {
  if (aToken) {
    getAllSessions()
  }
}, [aToken, getAllSessions])

  return (
    <div className='px-2 sm:px-8 py-12 h-screen sm:pl-[23%]'>

      <div className='max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        {/* Header */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] px-6 py-3 mb-4 bg-deep text-white items-center rounded text-[14px] font-medium">
          <h5>#</h5>
          <h5>Client</h5>
          <h5>Age</h5>
          <h5>Tutor</h5>
          <h5>Date & Time</h5>
          <h5>Fees</h5>
          <h5>Status</h5>
        </div>

        {[...(sessions || [])].reverse().map((session, i) => (
          <div key={i} className='flex flex-wrap justify-between gap-2 md:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] px-6 py-3 mb-1 bg-white items-center rounded text-[13px] font-medium'>

            <h5 className="sm:hidden">{i + 1}</h5>

            {/* Client */}
            <div className="flex gap-x-1">
              <div className="relative overflow-hidden rounded-full">
                <img src={session?.userData?.image} alt="" className='rounded-full w-10' />
                <span className='inset-0 bg-black/10 absolute' />
              </div>
              <p>{session?.userData?.name}</p>
            </div>

            {/* Age */}
            <p>{calculateAge(session?.userData?.dob)}</p>

            {/* Tutor */}
            <div className="flex gap-x-1">
              <div className='relative overflow-hidden rounded-full'>
                <img src={session?.tutData?.image} alt="" className='rounded-full w-10' />
                <span className='inset-0 bg-black/10 absolute' />
              </div>
              <p>{session?.tutData?.name}</p>
            </div>

            {/* Date */}
            <p>{session?.slotDate}, {session?.slotTime}</p>

            {/* Fees */}
            <p>{currency} {session?.amount}</p>

            {/* STATUS BUTTONS */}
            <div className='flex flex-col gap-2'>

              {/* PAY BUTTON */}
              <button
                onClick={() => sessionStripe(session._id)}
                disabled={session.cancelled || session.isCompleted}
                className={`${session.isCompleted ? "hidden" : "block"} 
                  disabled:cursor-not-allowed 
                  ${session.cancelled ? "text-red-500 btn-ghost" : "text-green-600"} 
                  max-md:px-1 py-1 text-xs rounded`}
              >
                {session.cancelled ? "Cancelled" : "Pay"}
              </button>

              {/* CANCEL BUTTON */}
              <button
                onClick={() => cancelSession(session._id)}
                disabled={session.isCompleted}
                className={`${session.isCompleted ? "hidden" : "block"} 
                  disabled:cursor-not-allowed 
                  text-red-500 max-md:px-1 py-1 text-xs rounded`}
              >
                {session.cancelled ? "Cancelled" : "Cancel"}
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default AllSessions
