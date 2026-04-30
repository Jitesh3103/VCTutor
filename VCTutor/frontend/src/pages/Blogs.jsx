import React from 'react'
import { blogs } from '../assets/data'

function Blogs() {
    return (
        <div className='max-padd-container bg-primary py-16 xl:py-28'>
            {/* {container} */}
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-y-12 pt-6'>
                {blogs.map((blog)=>(
                    <div key={blog.title} className='relative'>
                    <img src={blog.image} alt="" className='rounded-xl' />
                    <p className='medium-14 mt-6'>{blog.category}</p>
                     <h5 className='h5 mb-1 pr-4'>{blog.title}</h5>
                     <p>write your blog and let others explore it</p>
                     <button className='underline mt-2 bold-14'>continue reading</button>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Blogs
