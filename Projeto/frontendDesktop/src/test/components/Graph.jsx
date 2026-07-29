import React from 'react'
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Bar, BarChart, Cell } from 'recharts';

const data = [
    { day: "Mon", value: 1000 },
    { day: "Tue", value: 1500 },
    { day: "Wed", value: 2200 },
    { day: "Thu", value: 2800 },
    { day: "Fri", value: 2000 },
    { day: "Sat", value: 3465 },
    { day: "Sun", value: 1800 },
];

function Graph() {
    return (
        <div className='w-full h-72 bg-neutral-900 flex justify-start items-start'>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} barCategoryGap="35%">
                    <CartesianGrid stroke="#262626" vertical={false} />
                    <XAxis dataKey="day" axisline={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                    <YAxis dataKey="value" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12}} />
                    <Bar dataKey="value" radius={[999, 999, 999, 999]} barSize={18}>
                        {data.map((entry, index) => (
                            <Cell key={index} fill={entry.day === "Sat" ? "#84cc16" : "#d4d4d8"}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Graph