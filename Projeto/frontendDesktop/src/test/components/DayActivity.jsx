import React from 'react'
import { Home, Settings, TrendingUp, ChartColumnStacked, ArrowBigRight } from 'lucide-react'



function DayActivity() {
    return (
        <div className='bg-neutral-900 rounded-xl p-4 h-full'>
            <div className=' items-center mb-4'>
                <h2 className='font-semibold text-white flex justify-between'>Day Activity<span><ArrowBigRight /></span></h2>
            </div>
        </div>
    )
}

export default DayActivity