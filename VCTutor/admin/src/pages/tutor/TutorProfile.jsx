import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { TutorContext } from "../../context/TutorContext";
import { AppContext } from "../../context/AppContext";

const TutorProfile = () => {

  const { tToken, profileData, setProfileData, getProfileData } = useContext(TutorContext);
  const { backendUrl, currency } = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = async () => {
    try {

      const updateData = {
        fees: profileData.fees,
        address: profileData.address,
        available: profileData.available
      };

      const { data } = await axios.post(
        backendUrl + "/api/tutor/update-profile",
        updateData,
        { headers: { ttoken: tToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEditing(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (tToken) {
      getProfileData();
    }
  }, [tToken]);

  return (
    profileData && (
      <div className="px-4 sm:px-8 py-10 sm:pl-[23%]">

        <div className="max-w-xl">

          <div className="flex flex-col items-start">
            <img
              src={profileData.image}
              alt=""
              className="w-32 h-32 rounded-md object-cover"
            />
            <h2 className="text-2xl font-bold mt-4">{profileData.name}</h2>
            <p className="text-gray-500">{profileData.email}</p>
          </div>

          <hr className="my-4" />

          <div>
            <label className="font-semibold">About</label>
            <p className="mt-1">{profileData.about}</p>
          </div>

          <div className="mt-3">
            <label className="font-semibold">Fees</label>
            {isEditing ? (
              <input
                type="number"
                value={profileData.fees}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    fees: e.target.value
                  }))
                }
                className="border p-1 px-2 w-full rounded mt-1"
              />
            ) : (
              <p className="mt-1">
                {currency} {profileData.fees}
              </p>
            )}
          </div>

          <div className="mt-3">
            <label className="font-semibold">Available</label>
            {isEditing ? (
              <input
                type="checkbox"
                checked={profileData.available}
                onChange={() =>
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available
                  }))
                }
                className="ml-2"
              />
            ) : (
              <p className="mt-1">
                {profileData.available ? "Yes" : "No"}
              </p>
            )}
          </div>

          <hr className="my-4" />

          <h4 className="font-semibold text-gray-600 mb-2">
            Location Details
          </h4>

          <div className="mt-2">
            <label className="font-semibold">City</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.address?.city || ""}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      city: e.target.value
                    }
                  }))
                }
                className="border p-1 px-2 w-full rounded mt-1"
              />
            ) : (
              <p className="mt-1">
                {profileData.address?.city || "-"}
              </p>
            )}
          </div>

          <div className="mt-2">
            <label className="font-semibold">Country</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.address?.country || ""}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      country: e.target.value
                    }
                  }))
                }
                className="border p-1 px-2 w-full rounded mt-1"
              />
            ) : (
              <p className="mt-1">
                {profileData.address?.country || "-"}
              </p>
            )}
          </div>

          <button
            onClick={() => {
              if (isEditing) {
                handleUpdateProfile();
              } else {
                setIsEditing(true);
              }
            }}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>

        </div>
      </div>
    )
  );
};

export default TutorProfile;