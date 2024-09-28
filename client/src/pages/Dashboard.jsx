import React from 'react'
import { MdBook } from 'react-icons/md'
import { GiBlackBook } from "react-icons/gi";
import { FaUserGroup, FaUserPlus } from 'react-icons/fa6';
import { GrHelpBook } from "react-icons/gr";

const Dashboard = () => {
  return (
    <>
    <div className='p-10 w-5/6 h-screen'>
      <h1 className='text-4xl  font-semibold font-myFont'>Dashboard</h1>
    <div className='flex p-10   w-full flex-col '>
      <div className="flex gap-5 flex-row bg-[#eeeeee] w-full h-[15vh] justify-evenly items-center">
        <div className="flex justify-center items-center gap-3">
            <GiBlackBook className='text-5xl bg-[#2b2be8] rounded-full p-3 text-white'/>
            <div className="flex flex-col">
                <h1 className='text-sm font-myFont'>Borrowed</h1>
                <h1 className='text-xl font-bold'>142</h1>
            </div>
        </div>
        <div className="flex justify-center items-center gap-3">
        <div className='bg-[#2b2be8] p-4  rounded-full'>
            <GrHelpBook className='text-2xl  text-white'/>
        </div>
            <div className="flex flex-col">
            <h1 className='text-sm font-myFont'>Overdue</h1>
                <h1 className='text-xl font-bold'>8</h1>
            </div>
        </div>
        <div className="flex justify-center items-center gap-3">
        <div className='bg-[#2b2be8] p-4  rounded-full'>
            <FaUserGroup className='text-2xl  text-white'/>
            </div>
            <div className="flex flex-col">
            <h1 className='text-sm font-myFont'>Visitors</h1>
                <h1 className='text-xl font-bold'>532</h1>
            </div>
        </div>
        <div className="flex justify-center items-center gap-3">
           <div className='bg-[#2b2be8] p-4 rounded-full'>
           <FaUserPlus className='text-2xl  text-white'/>
           </div>
            <div className="flex flex-col">
            <h1 className='text-sm font-myFont'>New Member</h1>
                <h1 className='text-xl font-bold'>42</h1>
            </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Dashboard
