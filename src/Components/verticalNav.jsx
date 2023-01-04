import React from "react"
import add from '../image/add.svg'
import lineTool from '../image/lineTool.svg'
import FibboTool from '../image/Fibbotool.svg'
import bursh from '../image/bursh.svg'
import text from '../image/text.svg'
import pattern from '../image/pattern.svg'
import positionTool from '../image/positionTool.svg'
import { Brush } from "react-financial-charts"
export const VerticalNav = ()=>{

    return <nav className="vertical_nav">
        <ul>
            <li>
                <img src={add} className='svg_size'/>
            </li>
            <li>
                <img src={lineTool} className='svg_size'/>
            </li>
            <li>
                <img src={FibboTool} className='svg_size'/>
            </li>
            <li>
                <img src={bursh} className='svg_size'/>
            </li>
            <li>
                <img src={text} className='svg_size'/>
            </li>
            <li>
                <img src={pattern} className='svg_size'/>
            </li>
            <li>
                <img src={positionTool} className='svg_size'/>
            </li>
        </ul>
    </nav>
}