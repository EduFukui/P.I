import React, { useState } from 'react'
import SideBar from '../../components/SideBar';
import Graph from '../components/Graph';
import TaskList from '../components/TaskList';
import TeamRating from '../components/TeamRating';
import Performance from '../components/Performance';
import DayActivity from '../components/DayActivity';

function Dashboard2() {
  const menu = ["Analystics Team", "Crypto Team", "Dev Team", "Marketing Team", "Red"]
  const [active, setActive] = useState("Analystics Team")
  return (
    <div className='h-screen w-screen flex'>
      <SideBar />

      {/* Body */}
      <div className='bg-black w-full p-0'>
        {/* Header */}
        <div className='w-full h-33 bg-black p-0'>
          <div>
          <h1 className='text-white p-4 text-5xl font-semibold'>Manage your Projects</h1>
          <h2 className='text-gray-400 pl-5 pb-3'>Here you can track projects, tasks progress and team activity.</h2>
          <div className='flex pl-5 gap-10'>
            {menu.map((index) => {
              return <div key={index} onClick={() => { setActive(index) }} className={`text-white cursor-pointer  ${active === index ? "border-b-2 border-lime-400" : "border-b-2 border-gray-400"}`}>{index}</div>
            })}</div>
          </div>
          {/* <div></div> */}
        </div>

        <div className='grid grid-cols-12 gap-4 p-4'>


          {/* Team Earnings */}
          <div className='col-span-8 bg-neutral-900 rounded-xl'>
            <h1 className='text-white p-6 text-3xl'>Team Earnings</h1>
            <Graph />
          </div>

          {/* Task List */}
          <div className='col-span-4'>
            <TaskList />
          </div>

          {/* Team Rating */}
          <div className='col-span-4'>
            <TeamRating />
          </div>

          <div className='col-span-4'>
            <Performance />
          </div>

          <div className='col-span-4'>
            <DayActivity />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard2

