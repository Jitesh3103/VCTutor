import React from "react";
import about1 from '../assets/about1.png'
import { FaArrowRight, FaChalkboardTeacher, FaClock, FaUser } from 'react-icons/fa'
import playbutton from '../assets/playbutton.png'

const About = () => {
  return (
    <section className="max-padd-container py-24">

      {/* HERO */}
      <div className="text-center max-w-3xl mx-auto pb-0 ">
        <h1 className="text-4xl font-bold mb-4">
          About <span className="text-secondary">VC Tutor</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Empowering learners with personalized 1-on-1 tutoring anytime, anywhere.
        </p>
      </div>

      {/* FIXED SECTION (removed nested section) */}
      <div className='px-6 lg:px-12 py-10 xl:py-12'>

        {/* Title */}
        <div className='max-w-lg mx-auto text-center pb-10'>
          <h3>Choosen by lot of learners and top instrustors</h3>
          <p>
            Our platforms is designed to empower professional tutors who are passionate about knowledge and shaping futures
          </p>
        </div>

        {/* Container */}
        <div className='grid lg:grid-cols-[2fr_1fr] gap-5'>
          
          <div className='relative'>
            <img src={about1} alt="" className='rounded-3xl w-full' />
            <div className='absolute top-0 left-0 h-full w-full flex items-center justify-center'>
              <img src={playbutton} alt="" height={66} width={66} />
            </div>
          </div>

          <div className='flex justify-between flex-col bg-[#1c404d] text-white rounded-3xl p-4'>
            <div>
              <h4 className='medium-16'>Do you have formal teaching experience</h4>
              <p className='mt-1 text-white/60 text-[13px]'>
                Share your academic background and teaching history to help us to verify your profile.
                Experienced tutors gain visibility and trust among students
              </p>
            </div>

            <div className='flexBetween gap-10'>
              <h4 className='medium-16'>Become a tutor</h4>
              <button className='bg-white btn-light text-tertiary'>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 bg-light rounded-3xl mt-8'>
          
          <div className='flex flex-col gap-y-2 p-4 rounded-3xl bg-[#aedae6]'>
            <FaChalkboardTeacher className='text-xl mb-2 bg-white rounded-full h-10 w-10 p-2.5' />
            <h5 className='h5'>Teach what you love and expert at</h5>
            <p>
              Share your knowledge, connect with eager learners and inspire growth through flexible, personalized online tutoring sessions
            </p>
          </div>

          <div className='flex flex-col gap-y-2 p-4 rounded-3xl bg-[#fddbdb]'>
            <FaUser className='text-xl mb-2 bg-white rounded-full h-10 w-10 p-2.5' />
            <h5 className='h5'>Join a global community</h5>
            <p>
              Collaborate with expert tutors and students from around the world, building your reputation and earning with flexibility
            </p>
          </div>

          <div className='flex flex-col gap-y-2 p-4 rounded-3xl bg-[#fff6c9]'>
            <FaClock className='text-xl mb-2 bg-white rounded-full h-10 w-10 p-2.5' />
            <h5 className='h5'>Teach when your schedule</h5>
            <p>
              Enjoy complete freedom to set your own hours, manage your time and grow your tutoring from anywhere
            </p>
          </div>

        </div>

      </div>

      {/* WHO WE ARE */}
      <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
        <div>
          <h2 className="text-4xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-600 mb-4">
            VC Tutor is an online learning platform dedicated to connecting
            students with highly qualified tutors from around the world.
          </p>
          <p className=" text-gray-600 mb-4">VC Tutor is a modern online tutoring platform dedicated to delivering personalized learning experiences through expert guidance. By connecting students with skilled tutors from around the world, it offers flexible scheduling and tailored lessons to suit individual needs. Whether preparing for exams or building new skills, VC Tutor ensures a seamless and effective learning journey.</p>
          <p className="text-gray-600 mb-4">
            Our mission is to make education accessible, personalized, and effective.
          </p>
          <h3 className=" h4 text-gray-600 mb-4">Learn smarter with VC Tutor — your gateway to expert online tutoring.</h3>
        </div>
      </div>

      {/* EXTRA FEATURES */}
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Personalized Learning</h3>
          <p className="text-gray-600">
            One-on-one sessions tailored to your learning style and pace.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Global Tutors</h3>
          <p className="text-gray-600">
            Learn from certified tutors across different countries and expertise.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Flexible Scheduling</h3>
          <p className="text-gray-600">
            Book sessions anytime that fits your schedule.
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          Start Learning Today
        </h2>
        <p className="text-gray-600 mb-6">
          Join VC Tutor and experience a smarter way to learn.
        </p>
      </div>

    </section>
  );
};

export default About;