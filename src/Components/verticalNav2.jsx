import React from "react"
import bar from '../image/bar1.svg'
import clock from '../image/clock.svg'
import dataWindow from '../image/dataWindow.svg'
import hotlist from '../image/hotlist.svg'
import calender from '../image/calender.svg'
import idea from '../image/idea.svg'
import { useSelector  , useDispatch} from "react-redux"

import nextbutton from '../image/nextButton.svg'
import playbutton from '../image/playButton.svg'
import resetbutton from '../image/reset.svg'
import { handleReplayCheck } from '../REDUX/action';

export const VerticalNav2 = ({replayNextButton , handlePlay , handlePause , play})=>{

    const {replay} = useSelector(state => state)

    const dispatch = useDispatch()

    function handleReplay(){
        dispatch(handleReplayCheck())

    }

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
        {replay ? <div className="btns">
            <button onClick={()=> replayNextButton()}>
                <img alt='icon' src={nextbutton} className='svg_size'/>
            </button>
            {play ? <button onClick={()=> handlePause()}>pause</button> :
                <button onClick={()=> handlePlay()}>
                <img alt='icon' src={playbutton} className='svg_size'/>
            </button>
            }


            <button onClick={()=> handleReplay()}>
                <img alt='icon' src={resetbutton} className='svg_size'/>
            </button>
        </div>: ''}



    </nav>
}