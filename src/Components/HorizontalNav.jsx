import './navbar.css'
import candle from '../image/candle.svg'
import line from '../image/line.svg'
import kagi from '../image/kagi.svg'
import React from "react"
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import FastRewindOutlinedIcon from '@mui/icons-material/FastRewindOutlined';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Crop54OutlinedIcon from '@mui/icons-material/Crop54Outlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { PositionedMenu } from './ToogleDropDown'
import { Avatar } from '@mui/material'
export const HorizontalNav = ()=>{
    return <nav className="hori_navbar">

        {/* company section */}
        <ul>
            <li>
                <div className='avtar'><Avatar sx={{ width: 20, height: 20 , fontSize:13 , backgroundColor:'green' }} >M</Avatar></div>
            </li>
            <li>GBPUSD</li>
            <li>
                <AddCircleOutlineOutlinedIcon fontSize="small"/>
            </li>
        </ul>

        {/* time data section */}
        <ul>
            <li>15m</li>
            <li>1h</li>
            <li>D</li>
            <li>W</li>
            <li>M</li>
            <li style={{marginLeft:'-5px',marginTop:'2px'}}>
                <PositionedMenu />
            </li>
        </ul>
        {/* Chart section */}
        <ul className='hori_navbar--chartSection'>
            <li>
                <img src={candle} className='svg_size'/>
            </li>
            <li>
                <img src={line} className='svg_size' />
            </li>
            <li style={{marginLeft:'-5px',marginTop:'-3px'}}>
                <PositionedMenu />
            </li>
        </ul>

        {/* indicators */}
        <ul className='indicators_section'>
            <li className='flex'>
                <TimelineOutlinedIcon fontSize="small"/>
                <span>Indicators</span>
                <ExpandMoreOutlinedIcon fontSize="small"/>
            </li>
            <li>
                <GridViewOutlinedIcon fontSize='small'/>
            </li>
        </ul>

        {/* replay section */}
        <ul>
            <li className='flex'>
                <AccessAlarmOutlinedIcon fontSize='small'/>
                <span>Alert</span>
            </li>
            <li className='flex'>
                <FastRewindOutlinedIcon fontSize='small'/>
                <span>Replay</span>
            </li>
        </ul>

        {/* undo-redo */}
        <ul style={{border:'none'}}>
            <li>
                <ShortcutOutlinedIcon style={{transform:'scaleX(-1)'}} fontSize='small'/>
            </li>
            <li>
                <ShortcutOutlinedIcon fontSize='small'/>
            </li>
        </ul>

        {/* layout */}
        <ul>
            <li>
                <Crop54OutlinedIcon/>
            </li>
            <li className='flex'>
                <span>Gold Fixed</span>
                <ExpandMoreOutlinedIcon fontSize="small"/>
            </li>
        </ul>

        {/* setting icons */}
        <ul style={{border:'none'}}>
            <li>
                <SearchOutlinedIcon/>
            </li>
            <li>
                <SettingsOutlinedIcon/>
            </li>
            <li>
                <FullscreenOutlinedIcon/>
            </li>
            <li>
                <CameraAltOutlinedIcon/>
            </li>
            <li className='btn'>Publish</li>
        </ul>
    </nav>
}