import React from "react"
import bar from '../image/bar1.svg'
import clock from '../image/clock.svg'
import dataWindow from '../image/dataWindow.svg'
import hotlist from '../image/hotlist.svg'
import calender from '../image/calender.svg'
import idea from '../image/idea.svg'
import { useSelector } from "react-redux"

import nextbutton from '../image/nextButton.svg'
import playbutton from '../image/playButton.svg'
import resetbutton from '../image/reset.svg'

export const VerticalNav2 = ({replayNextButton , handlePlay , handlereset})=>{

    const {replay} = useSelector(state => state)

    return <nav className="vertical_nav nav2">
        <ul>
            <li>
                <img src={bar} className='svg_size'/>
            </li>
            <li>
                <img src={clock} className='svg_size'/>
            </li>
            <li>
                <img src={dataWindow} className='svg_size'/>
            </li>
            <li>
                <img src={hotlist} className='svg_size'/>
            </li>
            <li>
                <img src={calender} className='svg_size'/>
            </li>
            <li>
                <img src={idea} className='svg_size'/>
            </li>
        </ul>
        {replay ? <div className="btns">
            <button onClick={()=> replayNextButton()}>
                <img src={nextbutton} className='svg_size'/>
            </button>
            <button onClick={()=> handlePlay()}>
                <img src={playbutton} className='svg_size'/>
            </button>
            <button onClick={()=> handlereset()}>
                <img src={resetbutton} className='svg_size'/>
            </button>
        </div>: ''}



    </nav>
}