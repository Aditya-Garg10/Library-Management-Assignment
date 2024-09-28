import React, { useState } from 'react'
import { MdBook, MdDashboard, MdLibraryBooks, MdMoney } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import { LuUser2 } from "react-icons/lu";
import { Button, Drawer } from 'antd';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };

    const [menu, setmenu] = useState(window.location);
  return (
    <>
    <div className='h-screen sm:hidden sm:w-full  w-1/5 flex flex-col gap-10 justify-around py-10 items-center bg-[#eeeeee] '>
      <div className="flex flex-row gap-3 font-bold justify-center items-center">
        <MdLibraryBooks className='text-2xl' />
        <h1>Librarian.io</h1>
      </div>
     <div className='flex gap-5 flex-col ps-5 justify-center items-end w-full'>
     <div className="flex flex-row w-full   gap-3  justify-center items-center">
     
     <Link onClick={()=>setmenu("Dashboard")} to="/" className={`${menu === "Dashboard" ? "bg-[#2b2be8] text-white" : "bg-transparent text-black"} font-myFont   flex items-center  w-full h-[8vh]`}>
            <div className="flex items-center h-full w-1/4 justify-center ">
            <MdDashboard className={`text-xl ${menu === "Dashboard" ? "text-white" : "text-gray-600"} `}/>
            </div>
            <div className='flex items-center h-full w-3/4 justify-start '>
            <h1 className='text-sm '>Dashboard</h1>
            </div>
        </Link>
     
      </div>
      <div className="flex flex-row w-full gap-3  justify-center items-center">
        <Link onClick={()=>setmenu("books")} to="/books" className={`${menu === "books" ? "bg-[#2b2be8] text-white" : "bg-transparent text-black"} font-myFont  flex items-center  w-full h-[8vh]`}>
            <div className="flex items-center h-full w-1/4 justify-center ">
            <MdBook className={`text-xl ${menu === "books" ? "text-white" : "text-gray-600"} `}/>
            </div>
            <div className='flex items-center h-full w-3/4 justify-start '>
            <h1 className='text-sm '>Books</h1>
            </div>
        </Link>
      </div>
      <div className="flex flex-row w-full gap-3  justify-center items-center">
      <Link onClick={()=>setmenu("members")} to="/users" className={`${menu === "members" ? "bg-[#2b2be8] text-white" : "bg-transparent text-black"}  font-myFont   flex items-center  w-full h-[8vh]`}>
            <div className="flex items-center h-full w-1/4 justify-center ">
            <LuUser2 className={`text-xl ${menu === "members" ? "text-white" : "text-gray-600"} `}/>
            </div>
            <div className='flex items-center h-full w-3/4 justify-start '>
            <h1 className='text-sm '>Members</h1>
            </div>
        </Link>
      </div>
     
     </div>
     <div className="flex flex-row w-full   gap-3  justify-center items-center">
     
     <Link onClick={()=>setmenu("transactions")} to="/transactions" className={`${menu === "transactions" ? "bg-[#2b2be8] text-white" : "bg-transparent text-black"} font-myFont   flex items-center  w-full h-[8vh]`}>
            <div className="flex items-center h-full w-1/4 justify-center ">
            <MdMoney className={`text-xl ${menu === "transactions" ? "text-white" : "text-gray-600"} `}/>
            </div>
            <div className='flex items-center h-full w-3/4 justify-start '>
            <h1 className='text-sm '>Transactions</h1>
            </div>
        </Link>
     
      </div>
    </div>
    <div className='hidden h-[10vh] justify-around items-center sm:flex flex-row-reverse'>
    <Button className='rounded-none border-none  shadow-none bg-white text-black' type="primary" onClick={showDrawer}>
        <FaBars/>
      </Button>
      <Drawer title="Librarian.io" className='' onClose={onClose} open={open}>
      <div className='flex gap-5 flex-col ps-5 justify-center items-start w-full'>
     <div className="flex flex-row w-full   gap-3  justify-center items-center">
     <button className='hover:bg-[#2b2be8]  font-myFont text-black  hover:text-white flex items-center  w-3/4 h-[8vh]'>
            <div className="flex items-center h-full w-1/4 justify-center ">
            <MdDashboard className={`text-xl ${menu === "members" ? "text-white" : "text-gray-600"} `}/>
            </div>
            <div className='flex items-center h-full w-3/4 justify-start '>
            <h1 className='text-sm '>Dashboard</h1>
            </div>
        </button>
      </div>
      <div className="flex flex-row w-full gap-3  justify-center items-center">
        <Link to="/books" className='bg-[#2b2be8]  font-myFont  text-white flex items-center  w-3/4 h-[8vh]'>
            <div className="flex items-center h-full w-1/4 justify-center ">
            <MdBook className={`text-xl ${menu === "members" ? "text-white" : "text-gray-600"} `}/>
            </div>
            <div className='flex items-center h-full w-3/4 justify-start '>
            <h1 className='text-sm '>Books</h1>
            </div>
        </Link>
      </div>
      <div className="flex flex-row w-full gap-3  justify-center items-center">
      <button className='bg-[#2b2be8] font-myFont  text-white flex items-center  w-3/4 h-[8vh]'>
            <div className="flex items-center h-full w-1/4 justify-center ">
            <LuUser2 className={`text-xl ${menu === "members" ? "text-white" : "text-gray-600"} `}/>
            </div>
            <div className='flex items-center h-full w-3/4 justify-start '>
            <h1 className='text-sm '>Members</h1>
            </div>
        </button>
      </div>
     </div>
      </Drawer>
      <div className="flex flex-row gap-3 font-bold justify-center items-center">
        <MdLibraryBooks className={`text-xl ${menu === "members" ? "text-white" : "text-gray-600"} `}/>
        <h1>Librarian.io</h1>
      </div>
      </div>
    </>
  )
}

export default Sidebar
