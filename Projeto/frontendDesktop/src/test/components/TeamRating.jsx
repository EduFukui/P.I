import React from 'react'
import img1 from "../img/image.png"
import { ArrowBigRight } from 'lucide-react'

function TeamRating() {
    const team = [
        { name: "Emily", value: "$22k" },
        { name: "Ethan", value: "$21.5k" },
        { name: "Benjamin", value: "$18k" },
        { name: "Sophia", value: "$16k" },
    ]

    return (
        <div className='bg-lime-400 rounded-xl p-4 h-full'>
            <h2 className='font-semibold mb-4 flex justify-between'>Team Rating<span><ArrowBigRight /></span></h2>

            <div className='flex justify-between'>
                {team.map((member, index) => (
                    <div key={index} className='text-center'>
                        <div className='w-10 h-10 bg-white rounded-full mb-2 overflow-hidden'>
                            <img className='h-full object-cover' src={img1} alt="" />
                            </div>
                        <p className='text-xs'>{member.name}</p>
                        <p className='font-bold text-sm'>{member.value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TeamRating