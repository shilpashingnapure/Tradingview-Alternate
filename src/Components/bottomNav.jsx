import React from "react"
import bar from '../image/bar1.svg'
import clock from '../image/clock.svg'
import dataWindow from '../image/dataWindow.svg'
import hotlist from '../image/hotlist.svg'
import calender from '../image/calender.svg'
import idea from '../image/idea.svg'

export const BottomNav = ()=>{

    return <nav className="bottom_nav">
        <ul>
            <li>
                1D
            </li>
            <li>
                5D
            </li>
            <li>
              1M
            </li>
            <li>
                3M
            </li>
            <li>
                6M
            </li>
            <li>
                YTD
            </li>
            <li>1Y</li>
            <li>5Y</li>
            <li>All</li>
        </ul>
        <ul>

        </ul>
    </nav>
}