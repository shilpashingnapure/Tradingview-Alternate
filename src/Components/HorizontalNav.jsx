import './navbar.css'
import candle from '../image/candle.svg'
import line from '../image/line.svg'
import React, { useState } from "react"
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
import { SubMenu } from './ToogleDropDown'
import { Avatar  , Modal } from '@mui/material'
import { useDispatch, useSelector} from 'react-redux';
import { handleChartType, handleReplayCheck } from '../REDUX/action';
import { SearchModel } from './SearchModel'
import { Box } from "@mui/system"
import { ChartSetting } from './ChartSetting';
import convert from 'candlestick-convert';


const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height:'80px',
    bgcolor: '#fff',
    boxShadow: '0 2px 4px #0003',
    borderRadius:'6px',
    zIndex:999
  };


export const HorizontalNav = ({handleTimeFrame })=>{

    const Data = useSelector((state)=> state.data)
    function handleTimeFrameConvertion(type , newFrame){
        let convertToSec = newFrame
        if(type == 'min'){
            convertToSec = newFrame * 60
        }else if(type == 'hour'){
            convertToSec = newFrame * 3600
        }else if(type == 'day'){
            convertToSec = newFrame * 24 * 3600
        }else if(type == 'week'){
            convertToSec = newFrame * 86400 * 7
        }

        const d = convert.json(Data , 60 , convertToSec)
        handleTimeFrame(d)

    }

    const charts = [['bar.svg','Bars'],['candle.svg','Candles'],
            ['line.svg','Line'],['area.svg','Area'],['kagi.svg','Kagi'],
            ['kagi.svg' , 'Base Line'] , ['kagi.svg' , 'OHLC'] , ['kagi.svg' , 'Renko'] ,
            ['kagi.svg' , 'PointAndFigure']]

    const {replay} = useSelector(state => state)




    const dispatch = useDispatch()
    function handleChart(value){
        dispatch(handleChartType(value))
    }

    function handleReplay(){
        dispatch(handleReplayCheck(true))
    }
    return <nav className="hori_navbar">

        {/* company section */}
        <ul>
            <li>
                <div className='avtar'><Avatar sx={{ width: 20, height: 20 , fontSize:13 , backgroundColor:'green' }} >M</Avatar></div>
            </li>
            <li>
                <SearchModel/>
            </li>
            <li>
                <AddCircleOutlineOutlinedIcon fontSize="small"/>
            </li>
        </ul>

        {/* time data section */}
        <ul>
            <li onClick={()=> handleTimeFrameConvertion('min',1)}>1m</li>
            <li onClick={()=> handleTimeFrameConvertion('min',1)}>5m</li>
            <li onClick={()=> handleTimeFrameConvertion('min',15)}>15m</li>
            <li onClick={()=> handleTimeFrameConvertion('hour',1)}>1h</li>
            <li onClick={()=> handleTimeFrameConvertion('day' , 1)}>D</li>
            <li onClick={()=> handleTimeFrameConvertion('week' , 1)}>W</li>
            {/* <li onClick={()=> handleTimeFrameConvertion('month' , 1)}>M</li> */}
            <li style={{marginLeft:'-5px',marginTop:'2px'}}>
                <SubMenu list={{min : [1,3,5,15,30,45] , hour : [1,2,3,4]}} handleTimeFrameConvertion={handleTimeFrameConvertion}/>
            </li>
        </ul>
        {/* Chart section */}
        <ul className='hori_navbar--chartSection'>
            <li onClick={()=> handleChart('Candles')}>
                <img alt='icon' src={candle} className='svg_size'/>
            </li>
            <li onClick={()=> handleChart('Line')}>
                <img alt='icon' src={line} className='svg_size' />
            </li>
            <li style={{marginLeft:'-5px',marginTop:'-3px'}}>
                <SubMenu list={charts} type='chart'/>
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

            <li className='flex' style={ replay ? {color : 'blue'} : {}}>
                <FastRewindOutlinedIcon fontSize='small'/>
                <span onClick={handleReplay}>Replay</span>
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
                <ChartSetting/>
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