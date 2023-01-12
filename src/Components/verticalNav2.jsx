import React from "react"
import bar from '../image/bar1.svg'
import clock from '../image/clock.svg'
import dataWindow from '../image/dataWindow.svg'
import hotlist from '../image/hotlist.svg'
import calender from '../image/calender.svg'
import idea from '../image/idea.svg'





export const VerticalNav2 = ()=>{
    return <nav className="vertical_nav nav2">
        <ul>
            <li>
                <img alt='icon' src={bar} className='svg_size'/>
            </li>
            <li>
                <img alt='icon' src={clock} className='svg_size'/>
            </li>
            <li>
                <img alt='icon' src={dataWindow} className='svg_size'/>
            </li>
            <li>
                <img alt='icon' src={hotlist} className='svg_size'/>
            </li>
            <li>
                <img alt='icon' src={calender} className='svg_size'/>
            </li>
            <li>
                <img alt='icon' src={idea} className='svg_size'/>
            </li>
        </ul>
        </nav>
}