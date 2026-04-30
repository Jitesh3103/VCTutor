import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaStar } from "react-icons/fa";
import fallbackTutorImg from "../../assets/upload_icon.png";

const TutorsList = () => {
  const { tutors, aToken, getAllTutors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllTutors();
    }
  }, [aToken]);

  return (
    <div className="px-2 sm:px-8 py-12 min-h-screen sm:pl-[23%]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Tutors List</h2>
        <p className="text-sm text-gray-500">{tutors?.length || 0} tutors found</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {tutors?.map((tutor) => {
          const imageSrc = tutor.image?.includes("placeholder.co")
            ? fallbackTutorImg
            : tutor.image || fallbackTutorImg;

          return (
            <div
              key={tutor._id}
              className="bg-white rounded-lg overflow-hidden shadow-sm ring-1 ring-slate-900/10"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src={imageSrc}
                  alt={tutor.name}
                  onError={(e) => {
                    e.currentTarget.src = fallbackTutorImg;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h5 className="font-semibold text-base">{tutor.name}</h5>
                    <p className="text-sm text-gray-500">{tutor.subject}</p>
                  </div>
                  <span className="flex items-center gap-1 text-sm">
                    <FaStar className="text-yellow-500" />
                    4.8
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        tutor.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    {tutor.available ? "Available" : "Unavailable"}
                  </span>
                  <span className="font-medium">$ {tutor.fees}</span>
                </div>

                <button
                  onClick={() => changeAvailability(tutor._id)}
                  className="w-full bg-[#0f3d3e] text-white text-sm font-semibold py-2 rounded hover:bg-[#1f5c5d]"
                >
                  Change Availability
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TutorsList;
