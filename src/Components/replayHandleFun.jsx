import { CloseOutlined } from '@mui/icons-material'
import { Menu , MenuItem } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import nextbutton from '../image/nextButton.svg'
import playbutton from '../image/playButton.svg'
import { handleReplaySpeed } from '../REDUX/action'
export const FunHandleReplay = ({replayNextButton , handlereset , handlePlay , handlePause , play})=>{

    const {replay , replayValue , ReplaySpeed} = useSelector((state) => state)
    const dispatch = useDispatch()

    const speed = [10 , 3 , 1 , 0.5 , 0.3 , 0.1]

    const check = replay && replayValue != 0

    const [open, setopen] = React.useState(false);


    const handleClick = () => {
        setopen(!open);
      };
      const handleClose = () => {
        setopen(!open);
      };

      function handleSpeed(speed){
        dispatch(handleReplaySpeed(speed * 1000))
      }

    return <nav className="bottom_nav replayContainer" style={{borderBottom: '3px solid #e0e3eb'}}>
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

        <span onClick={handleClick}>{ReplaySpeed / 1000}x</span>
        {open ? <ul className='replayDropDown'>
            {speed.map((s)=>{
                return (
                    <li onClick={()=> handleSpeed(s)}>{s}x</li>
                )
            })}
        </ul>: null}

    </div>
        <CloseOutlined onClick={()=>handlereset()}/>
    </nav>
}