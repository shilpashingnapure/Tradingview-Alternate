import React , { useState } from "react"
import { useDispatch } from "react-redux"
import { handleTimeFrameInput } from "../REDUX/action"

export const CustomTimeFrame = ({handleTimeFrameConvertion , handleActive})=>{
    const [customInput , setCustomInput] = useState()

    const dispatch = useDispatch()

    function handleInput(e){

        if(e.key == 'Enter'){
            dispatch(handleTimeFrameInput(false))
            handleActive('m',customInput)
            handleTimeFrameConvertion('min',Number(customInput))

        }
    }
    return <div className="customFrameInputContainer">
        <h3>Change interval</h3>
        <input type='text' onKeyPress={handleInput} onChange={(e)=> setCustomInput(e.target.value)}/>
        <span>{customInput} minutes</span>
    </div>
}