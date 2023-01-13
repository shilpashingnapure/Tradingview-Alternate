import { CloseOutlined } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import nextbutton from '../image/nextButton.svg'
import playbutton from '../image/playButton.svg'
export const FunHandleReplay = ({replayNextButton , handlereset , handlePlay , handlePause , play})=>{

    const {replay , replayValue} = useSelector((state) => state)

    const check = replay && replayValue != 0

    return <nav className="bottom_nav" style={{borderBottom: '3px solid #e0e3eb'}}>
        <h1 className='headingReplay' style={ check ? { display : 'none'} : {}}>Double Click from want to Start</h1>
        <div className='btns'>

        {play ? <button onClick={()=> handlePause()} disabled={check ? false : true}>pause</button> :
                <button onClick={()=> handlePlay()} disabled={check ? false : true}>
                <img alt='icon' src={playbutton} className='svg_size' style={check ? {filter:'invert(0%)'} : {filter:'invert(80%)'}}/>
            </button>
        }
        <button onClick={()=> replayNextButton()} disabled={check ? false : true}>
            <img alt='icon' src={nextbutton} className='svg_size' style={check ? {filter:'invert(0%)'} : {filter:'invert(80%)'}}/>
        </button>
    </div>
        <CloseOutlined onClick={()=>handlereset()}/>
    </nav>
}