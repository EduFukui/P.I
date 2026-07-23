import React from 'react'
import { Home, Settings, TrendingUp, ChartColumnStacked, ChevronDown, ArrowBigRight } from 'lucide-react'

function TaskList() {

    const menu = [{
        nome: "Statistical analysis",
        icon: Home
    }, {
        nome: "Data mining",
        icon: ChartColumnStacked
    }, {
        nome: "Data quality assessment",
        icon: TrendingUp
    }, {
        nome: "Performance measurement",
        icon: Settings
    }, {
        nome: "Market research",
        icon: ChartColumnStacked
    }, {
        nome: "Hypothesis testing",
        icon: TrendingUp
    }]

    return (
        <div className='bg-neutral-200 rounded-xl p-4 h-full'>
            <h2 className='text-lg font-semibold mb-4 flex justify-between'>Task List <span><ArrowBigRight /></span></h2>

            <div className='space-y-2'>
                {menu.map((menu, index) => {
                    const Icon = menu.icon
                    return <div
                        key={index}
                        className={`p-3 rounded-lg cursor-pointer flex items-center justify-between
                        ${menu.nome === "Statistical analysis" ? "bg-lime-400" : "bg-white"}`}
                    ><span className='text-sm flex gap-1'><Icon/>{menu.nome}</span><span><ChevronDown /></span>
                    </div>
                })}
            </div>
        </div>
    )
}

export default TaskList