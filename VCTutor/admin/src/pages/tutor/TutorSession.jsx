import React, { useContext, useEffect } from "react";
import { TutorContext } from "../../context/TutorContext";
import { AppContext } from "../../context/AppContext";

const TutorSessions = () => {

  // ✅ GET FROM CONTEXT (IMPORTANT FIX)
  const {
    tToken,
    sessions,
    getSessions,
    cancelSession,
    completeSession
  } = useContext(TutorContext);

  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (tToken) {
      getSessions();
    }
  }, [tToken]);

  return (
    <div className="px-2 sm:px-8 py-12 h-screen sm:pl-[23%]">
      <div className="max-h-[80vh] min-h-[60vh] overflow-y-scroll">

        {/* HEADER */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] px-6 py-3 mb-4 bg-deep text-white items-center rounded text-[14px] font-medium">
          <h5>#</h5>
          <h5>Client</h5>
          <h5>Age</h5>
          <h5>Tutor</h5>
          <h5>Date & Time</h5>
          <h5>Fees</h5>
          <h5>Status</h5>
        </div>

        {/* LIST */}
        {[...(sessions || [])].reverse().map((session, i) => (
          <div
            key={session._id}
            className="flex flex-wrap justify-between gap-2 md:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] px-6 py-3 mb-1 bg-white items-center rounded text-[13px] font-medium"
          >

            <h5 className="sm:hidden">{i + 1}</h5>

            {/* CLIENT */}
            <div className="flex gap-x-2 items-center">
              <img
                src={session?.userData?.image}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <p>{session?.userData?.name}</p>
            </div>

            {/* AGE */}
            <p className="hidden md:flex">
              {calculateAge(session?.userData?.dob)}
            </p>

            {/* TUTOR */}
            <div className="flex gap-x-2 items-center">
              <img
                src={session?.tutData?.image}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <p>{session?.tutData?.name}</p>
            </div>

            {/* DATE */}
            <p>
              {session?.slotDate}, {session?.slotTime}
            </p>

            {/* FEES */}
            <p>
              {currency} {session?.amount}
            </p>

            {/* STATUS */}
            <div className="flex flex-col gap-2">

              {/* PAYMENT */}
              <p className="text-xs">
                {session?.payment ? "Paid" : "Not Paid"}
              </p>

              {/* CANCEL BUTTON */}
              <button
                onClick={() => cancelSession(session._id)}
                disabled={session?.cancelled}
                className={`${
                  session?.isCompleted ? "hidden" : "block"
                } disabled:cursor-not-allowed ${
                  session?.cancelled ? "text-red-500" : "text-orange-500"
                } px-2 py-1 text-xs rounded`}
              >
                {session?.cancelled ? "Cancelled" : "Cancel"}
              </button>

              {/* COMPLETE BUTTON */}
              <button
                onClick={() => completeSession(session._id)}
                disabled={session?.isCompleted}
                className={`${
                  session?.cancelled ? "hidden" : "block"
                } disabled:cursor-not-allowed ${
                  session?.isCompleted ? "text-green-500" : "text-blue-500"
                } px-2 py-1 text-xs rounded`}
              >
                {session?.isCompleted ? "Completed" : "Complete"}
              </button>

            </div>
          </div>
        ))}

        {/* EMPTY STATE */}
        {sessions?.length === 0 && (
          <p className="text-center mt-5 text-gray-500">
            No sessions available
          </p>
        )}

      </div>
    </div>
  );
};

export default TutorSessions;