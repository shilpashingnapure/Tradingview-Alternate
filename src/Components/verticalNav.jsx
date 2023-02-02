import React, { useState } from "react"
import add from '../image/add.svg'
import lineTool from '../image/lineTool.svg'
import FibboTool from '../image/Fibbotool.svg'
import bursh from '../image/bursh.svg'
import text from '../image/text.svg'
import pattern from '../image/pattern.svg'
import positionTool from '../image/positionTool.svg'
import { useDispatch, useSelector } from "react-redux"
import { handleTool } from "../REDUX/action"

export const VerticalNav = ()=>{
    const [select , setselect] = useState(false)

    const {tool} = useSelector(state => state)
    const dispatch = useDispatch()
    function setTool(tool){

        dispatch(handleTool(tool))
        // setselect(!select)

    }
    return <nav className="vertical_nav">
        <ul>
            <li>
                <img alt='icon' src={add} className='svg_size'/>
            </li>
            <li onClick={()=>setTool('trendline')} style={tool == 'trendline' ? {filter:'invert(48%) sepia(13%) saturate(3207%) hue-rotate(130deg) brightness(95%) contrast(80%)'} : {}}>
                <img alt='icon' src={lineTool} className='svg_size'/>
            </li>
            <li>
                <img alt='icon' src={FibboTool} className='svg_size'/>
            </li>
            <li>
                <img alt='icon' src={bursh} className='svg_size'/>
            </li>
            <li>
                <img alt='icon' src={text} className='svg_size'/>
            </li>
            <li>
                <img alt='icon' src={pattern} className='svg_size'/>
            </li>
            <li>
                <img alt='icon' src={positionTool} className='svg_size'/>
            </li>
        </ul>
    </nav>
}