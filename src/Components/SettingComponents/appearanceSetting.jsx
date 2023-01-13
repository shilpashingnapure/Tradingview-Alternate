import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleBackgroundColor } from "../../REDUX/action"
export const ApparenaceSetting = ()=>{
    const {backgroundColorType} = useSelector(state => state)
    const {solid , gradient} = backgroundColorType
    const [typeBg , setTypeBg] = useState('solid')
    const dispatch = useDispatch()

    // UPDATING IF BG SOLID
    function handleBackgroundSolid(value){
        dispatch(handleBackgroundColor({...backgroundColorType , backgroundType:'solid' , solid : {color : value}}))
    }

    // UPDATING IF BG IS LIEANER
    function handleBackgroundGradient(key , value){
        if(key == 'color1'){
            dispatch(handleBackgroundColor({...backgroundColorType , backgroundType:'linear', gradient : {...gradient , color1 : value}}))
        }else{
            dispatch(handleBackgroundColor({...backgroundColorType , backgroundType:'linear' ,gradient : {...gradient , color2:value}}))
        }
    }

    return (
        <div>
            <span className="titleSetting">CHART BASIC STYLES</span>
            <div>
                <label>Background</label>

                <select onChange={(e)=> setTypeBg(e.target.value)}>
                    <option value="solid">Solid</option>
                    <option value="Gradient">Gradient</option>
                </select>
                {
                    typeBg == 'solid' ?
                        <div>
                            <input type="color"  value={solid.color} onChange={(e)=> handleBackgroundSolid(e.target.value)}/>
                        </div>
                        :
                        <div>
                            <input type="color" value={gradient.color1} onChange={(e)=> handleBackgroundGradient("color1",e.target.value)}/>
                            <input type="color" value={gradient.color2} onChange={(e)=> handleBackgroundGradient("color2",e.target.value)}/>
                        </div>

                }

            </div>
        </div>
    )
}