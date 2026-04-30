import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FaLocationDot } from 'react-icons/fa6'
import SimilarTutors from '../Components/SimilarTutors'

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const Session = () => {

    const { tutId } = useParams();
    const { tutors, currency, navigate, getTutorsData, backendUrl, token } = useContext(AppContext);
    const [tutorInfo, settutorInfo] = useState(null);
    const [availableslots,setavailableslots]=useState([])
    const [selecteddayindex,setselecteddayindex]=useState(0)
    const [selectedTime,setselectedTime]=useState("")


    useEffect(() => {
        const tutor = tutors.find((t) => t._id === tutId);
        settutorInfo(tutor);
    }, [tutors, tutId]);

    useEffect(() => {
        if (!tutorInfo) return

        const generareSlots = () => {
            const today = new Date();
            const slotsPerDay = [];

            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);

                const daySlots = [];
                const startTime = new Date(date);
                const endTime = new Date(date);

                // For today
                if (i === 0) {
                    startTime.setHours(Math.max(date.getHours() + 1, 10));
                    startTime.setMinutes(date.getMinutes()>30 ?30:0)
                     // Start from the next hour
                }else {
                    startTime.setHours(10, 0, 0, 0); // Start at 8:00 AM
                }
                endTime.setHours(21,0,0,0)
                
                // create slots every 30mins

                while(startTime<endTime){
                    const day =startTime.getDate()
                    const month =startTime.getMonth()+1
                    const year =startTime.getFullYear()
                    const slotDate=`${day}/${month}/${year}`
                    const slotTime=startTime.toLocaleTimeString([],{
                        hour:"2-digit",
                        minute:"2-digit"
                    });

                    //check if slot is available (not booked)
                    const isSlotAvailable = !tutorInfo.slots_booked?.[slotDate]?.includes(slotTime)
                    if(isSlotAvailable){

                    daySlots.push({
                        datetime:new Date(startTime),
                        time:slotTime,
                        dateString:slotDate,
                    });
                      }

                    startTime.setMinutes(startTime.getMinutes()+30)
                }
                slotsPerDay.push(daySlots)
            }
            setavailableslots(slotsPerDay);
        };
            
        generareSlots()
    },[tutorInfo])

const bookSession = async ()=>{
    if(!token){
        toast.warn("Login to book session");
        return navigate("/login");
    }
    try{
        if (!selectedTime) {
            toast.warn("Select a time slot");
            return;
        }

        const date = availableslots[selecteddayindex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        const slotDate = `${day}/${month}/${year}`

        const {data} = await axios.post(backendUrl + "/api/user/book-session", {tutId, slotDate, slotTime:selectedTime},{headers:{token}})
        if(data.success){
            toast.success(data.message)
            getTutorsData()
            navigate('/my-sessions')
        }else{
            toast.error(data.message)
        }
    }catch(error){
        console.log(error)
        toast.error(error.message)
    }
}

    return (
        <div className='max-padd-container py-28'>
            {tutorInfo && (
                <>
                    <div className='grid grid-cols-1 xl:grid-cols-[444px_1fr] gap-x-12 gap-y-5 items-start'>

                        {/* IMAGE */}
                        <div className='max-h-[444px] max-w-[444px] overflow-hidden rounded-lg'>
                            <img src={tutorInfo.image} alt="tutorImg" className='object-contain w-full h-full' />
                        </div>

                        {/* TEXT CONTENT (moved automatically to right via grid) */}
                        <div className='max-w-xl'>

                            <div className='flexBetween max-w-sm'>
                                <div>
                                    <h3 className='bold-22'>
                                        {tutorInfo.name}
                                    </h3>
                                    <h5 className='h5 font-semibold mb-1 '>
                                        {tutorInfo.qualification}
                                    </h5>
                                </div>

                                <span className='flex items-center gap-2 px-4 py-1 ring-1 ring-slate-900/10 rounded-full'>
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${tutorInfo.available ? "bg-green-500" : "bg-red-500"
                                            }`}
                                    />
                                    <p>
                                        {tutorInfo.available ? "available" : "unavailable"}
                                    </p>
                                </span>
                            </div>

                            <div className='flexBetween rounded-3xl text-[13px] font-semibold max-w-sm ring-1 ring-slate-900/10 p-4 my-2'>

                                <div className='flex flex-col gap-1'>
                                    <h5>Experience</h5>
                                    <p>{tutorInfo.experience}</p>
                                </div>

                                <hr className='h-8 w-[1px] bg-tertiary/10 border-none' />

                                <div className='flex flex-col gap-1'>
                                    <h5>Subjects</h5>
                                    <p>{tutorInfo.subject}</p>
                                </div>

                                <hr className='h-8 w-[1px] bg-tertiary/10 border-none' />

                                <div className='flex flex-col gap-1'>
                                    <h5>Fee</h5>
                                    <p>{currency} {tutorInfo.fees}/30min</p>
                                </div>

                            </div>

                            <p className='flex gap-2 mb-2 mt-5'>
                                <FaLocationDot className='inline-block' />
                                <span>
                                    {tutorInfo.address?.city || tutorInfo.address?.line1 || "Location not added"}
                                    {tutorInfo.address?.country ? `, ${tutorInfo.address.country}` : ""}
                                </span>
                            </p>

                            <hr className='border-none h-[1px] bg-tertiary/10 mb-4' />

                            <h4 className='h4'>About me</h4>
                            <p>{tutorInfo.about}</p>

                            {/* Booking slots */}
                            <div className='mt-8'>
                                <h5 className='h5 mb-3'>
                                    Booking Slots
                                </h5>
                                {/* Days horizontal scroll */}
                                <div className='flex gap-3 overflow-x-scroll pb-2'>
                                    {availableslots.map((slots,index)=>(
                                        <div key={index} onClick={()=>setselecteddayindex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${selecteddayindex===index? "bg-secondary" :"border border-gray-200"}`}>
                                            <div className='medium-14'>
                                                {slots[0] && daysOfWeek[slots[0].datetime.getDay()]}
                                            </div>
                                            <div medium-14>
                                                {slots[0] && slots[0].datetime.getDate()}
                                            </div>

                                        </div>
                                    ))}
                                </div>
                                {/* Time:Slots scroll */}

                                <div className='flex gap-3 overflow-x-scroll mt-4 max-w-[777px]'>
                                    {availableslots[selecteddayindex]?.map((slot,i)=>(
                                        <div key={i} onClick={()=>setselectedTime(slot.time)} className={`text-xs font-light flexCenter min-w-20 py-2 rounded-full cursor-pointer ${slot.time===selectedTime? "bg-secondary":"text-gray-400 border border-gray-300"}`}>
                                            {slot.time.toLowerCase()}
                                        </div>
                                    ))}
                                </div>
                                <button onClick={bookSession} className='btn-secondary !text-tertiary mt-4'>Book a Session</button>
                            </div>


                        </div>

                    </div>


                    {/* ===============similar tuttor session================== */}
                    <SimilarTutors tutId={tutId} subject={tutorInfo.subject} />
                </>
            )}
        </div>
    )
}

export default Session
