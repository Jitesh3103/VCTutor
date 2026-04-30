import React from 'react'
import { FaUserTie ,FaClock ,FaUserFriends } from 'react-icons/fa'
import {BsClipboardFill} from 'react-icons/bs'
const Features = () => {
    return (
        <section className="flex flex-wrap mx-auto max-w-[1440px] px-6 lg:px-12 justify-center relative bottom-12">
            <div className='flex flex-wrap gap-x-4 bg-light rounded-3xl p-8'>
                <div className='flex flex-col gap-y-2 p-4 rounded-xl max-w-[233px]  bg-violet-300'>
                    <FaUserTie className='text-xl mb-2'/>
                    <h5 className='h5'>Expert Tutors</h5>
                    <p>Qualified and Experienced tutors </p>
                </div>
                <div className='flex flex-col gap-y-2 p-4 rounded-xl max-w-[233px]  bg-slate-300'>
                    <FaClock className='text-xl mb-2'/>
                    <h5 className='h5'>24/7 availability</h5>
                    <p>Lecture to access anywhere at anytime</p>
                </div>
                <div className='flex flex-col gap-y-2 p-4 rounded-xl max-w-[233px] bg-violet-300'>
                    <BsClipboardFill className='text-xl mb-2'/>
                    <h5 className='h5'>interactive whiteboards</h5>
                    <p>Learn with easy and more understandable</p>
                </div>
                <div className='flex flex-col gap-y-2 p-4 rounded-xl max-w-[233px] bg-slate-300'>
                    <FaUserFriends className='text-xl mb-2'/>
                    <h5 className='h5'>1-1 Live session</h5>
                    <p>complete focus and interaction with studeny</p>
                </div>
            </div>
        </section>
    )
}

export default Features
