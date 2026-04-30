import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

import tutor from "../../assets/tutor1.png"
import client from "../../assets/user.jpg"
import sessionIcon from "../../assets/upload_icon.png"
import latest from "../../assets/upload_icon.png"

const Dashboard = () => {

  const { aToken, getDashData, dashData, cancelSession } = useContext(AdminContext)
  const { calculateAge } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken, getDashData])

  return (dashData && (
    <div className='px-2 sm:px-8 py-12 h-screen sm:pl-[23%] lg:w-11/12'>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Tutors */}
        <div className="flex items-center gap-7 p-5 bg-[#d5eedd] rounded">
          <img src={tutor} alt="" className='hidden sm:flex w-8'/>
          <div>
            <div className='font-bold text-lg'>{dashData.tutors}</div>
            <p>Tutors</p>
          </div>
        </div>

        {/* Clients */}
        <div className="flex items-center gap-7 p-5 bg-[#fff4d2] rounded">
          <img src={client} alt="" className='hidden sm:flex w-8'/>
          <div>
            <div className='font-bold text-lg'>{dashData.clients}</div>
            <p>Clients</p>
          </div>
        </div>

        {/* Sessions */}
        <div className="flex items-center gap-7 p-5 bg-[#d1e8ff] rounded">
          <img src={sessionIcon} alt="" className='hidden sm:flex w-8'/>
          <div>
            <div className='font-bold text-lg'>{dashData.sessions}</div>
            <p>Sessions</p>
          </div>
        </div>

      </div>

      {/* Latest Sessions */}
      <div className="mt-6">

        <div className="flex gap-3 px-6 py-3 mb-4 bg-blue-600 text-white items-center rounded">
          <img src={latest} alt="" className="w-6 invert"/>
          <h5 className="font-semibold">Latest Sessions</h5>
        </div>

        <div>
          {dashData.latestSessions?.map((session, i) => (
            <div
              key={i}
              className="flex flex-col sm:grid grid-cols-[2fr_2fr_1fr] gap-3 px-6 py-3 mb-2 bg-white rounded text-sm font-medium"
            >

              {/* Tutor Name */}
              <div className="flex items-center gap-4">
                <span className="hidden sm:block">{i + 1}</span>

                <div className="flex items-center gap-2">
                  <img
                    src={session.tutData.image}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p>{session.tutData.name}</p> {/* ✅ INCLUDED */}
                </div>
              </div>

              {/* Date + Time */}
              <div>
                <p className="max-lg:text-[12px]">
                  {session.slotDate}, {session.slotTime} {/* ✅ INCLUDED */}
                </p>
                <p className="text-xs text-gray-500">
                  Age: {calculateAge(session.userData.dob)}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2">

                {/* Cancel Button */}
                <button
                  onClick={() => cancelSession(session._id)}  
                  disabled={session.cancelled}
                  className={`
                    ${session.isCompleted ? "hidden" : "block"}
                    disabled:cursor-not-allowed
                    ${session.cancelled ? "bg-gray-300" : "bg-red-100 text-red-500"}
                    px-2 py-1 text-xs rounded
                  `}
                >
                  {session.cancelled ? "Cancelled" : "Cancel"} {/* ✅ INCLUDED */}
                </button>

                {/* Completed Button */}
                <button
                  disabled={!session.isCompleted}
                  className={`
                    ${!session.isCompleted ? "hidden" : "block"}
                    disabled:cursor-not-allowed
                    disabled:text-green-500
                    bg-green-100 text-green-600
                    px-2 py-1 text-xs rounded
                  `}
                >
                  Completed {/* ✅ INCLUDED */}
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  ))
}

export default Dashboard
