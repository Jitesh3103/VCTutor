import React, { useContext, useEffect } from "react";
import { TutorContext } from "../../context/TutorContext";
import { AppContext } from "../../context/AppContext";

import earningsImg from "../../assets/upload_icon.png";
import clientImg from "../../assets/user.jpg";
import sessionImg from "../../assets/upload_icon.png";
import latestImg from "../../assets/upload_icon.png";

const TutorDashboard = () => {

  const {
    dashData,
    getDashData,
    tToken,
    cancelSession,
    completeSession
  } = useContext(TutorContext);

  const { currency } = useContext(AppContext);

  // ✅ FETCH DASHBOARD DATA
  useEffect(() => {
    if (tToken) {
      getDashData();
    }
  }, [tToken]);

  return (
    dashData && (
      <div className="px-2 sm:px-8 py-12 h-screen sm:pl-[23%]">

        {/* ===== TOP CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Earnings */}
          <div className="flex items-center gap-5 p-5 bg-[#d5eedd] rounded">
            <img src={earningsImg} className="w-8 hidden sm:block" />
            <div>
              <p className="text-lg font-bold">
                {currency} {dashData.earnings}
              </p>
              <p className="text-gray-500 text-sm">Earnings</p>
            </div>
          </div>

          {/* Clients */}
          <div className="flex items-center gap-5 p-5 bg-[#fff4d2] rounded">
            <img src={clientImg} className="w-8 hidden sm:block" />
            <div>
              <p className="text-lg font-bold">{dashData.clients}</p>
              <p className="text-gray-500 text-sm">Clients</p>
            </div>
          </div>

          {/* Sessions */}
          <div className="flex items-center gap-5 p-5 bg-[#d1e8ff] rounded">
            <img src={sessionImg} className="w-8 hidden sm:block" />
            <div>
              <p className="text-lg font-bold">{dashData.sessions}</p>
              <p className="text-gray-500 text-sm">Sessions</p>
            </div>
          </div>

        </div>

        {/* ===== LATEST SESSIONS ===== */}
        <div className="mt-6">

          <div className="flex items-center gap-3 px-6 py-3 mb-4 bg-deep text-white rounded">
            <img src={latestImg} className="w-6 invert" />
            <h5>Latest Sessions</h5>
          </div>

          {dashData.latestSessions.map((session, i) => (
            <div
              key={session._id}
              className="flex flex-wrap justify-between gap-2 sm:grid grid-cols-[2fr_2fr_1fr] px-6 py-3 mb-2 bg-white rounded text-sm"
            >

              {/* USER */}
              <div className="flex items-center gap-3">
                <p className="hidden sm:block">{i + 1}</p>
                <img
                  src={session?.userData?.image}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p>{session?.userData?.name}</p>
              </div>

              {/* DATE */}
              <p>
                {session?.slotDate}, {session?.slotTime}
              </p>

              {/* ACTIONS */}
              <div className="flex flex-col gap-2">

                {/* CANCEL */}
                <button
                  onClick={() => cancelSession(session._id)}
                  disabled={session?.cancelled}
                  className={`${
                    session?.isCompleted ? "hidden" : "block"
                  } disabled:cursor-not-allowed ${
                    session?.cancelled ? "text-red-500" : "text-orange-500"
                  } text-xs`}
                >
                  {session?.cancelled ? "Cancelled" : "Cancel"}
                </button>

                {/* COMPLETE */}
                <button
                  onClick={() => completeSession(session._id)}
                  disabled={session?.isCompleted}
                  className={`${
                    session?.cancelled ? "hidden" : "block"
                  } disabled:cursor-not-allowed ${
                    session?.isCompleted ? "text-green-500" : "text-blue-500"
                  } text-xs`}
                >
                  {session?.isCompleted ? "Completed" : "Complete"}
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    )
  );
};

export default TutorDashboard;
