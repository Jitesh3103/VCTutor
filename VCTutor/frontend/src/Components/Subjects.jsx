import React from 'react'
import { subjectsData } from '../assets/data'
import { Link } from 'react-router-dom'
const Subjects = () => {
    return (
        <section className='max-padd-container py-16 xl:py-20'>
            <div className='max-w-lg mx-auto text-center pb-16'>
                <h3 className='h3'>Explore By Subject</h3>
                <p>You learn here all you needed which helps to explore and have knowledge</p>

            </div >
            <div className='flexCenter flex-wrap gap-1 sm:gap-14 '>
            {/* Container */}
            {subjectsData.map((subject,i) => (
                <Link key={i} onClick={()=>scrollTo(0,0)} to= {`/tutors/${subject.name}`} className='flexCenter flex-col bg-white h-28 w-40 rounded-xl'>
                    <img src={subject.image} alt="" height={55} width={55}/>
                    <h5 className='h5 font-semibold mt-3'>{subject.name}</h5>
                </Link>
            ))}
            </div>
        </section>
        
    )
}

export default Subjects
