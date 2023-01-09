import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleColors } from "../../REDUX/action"
export const CandleSetting = ()=>{

    const dispatch = useDispatch()
    const {colors} = useSelector(state => state)



    function handleColor(k , v){
        if(k == 'checkWick'){
            dispatch(handleColors({...colors , wickCheck:!colors.wickCheck}))
        }else if(k == 'checkFill'){
            dispatch(handleColors({...colors , fillCheck: !colors.fillCheck}))
        }else if(k == 'checkBorder'){
            dispatch(handleColors({...colors , borderCheck : !colors.borderCheck}))
        }else if(k == 'lastValueCheck'){
            dispatch(handleColors({...colors , lastValueCheck : !colors.lastValueCheck}))
        }

        if(k == 'open'){
            dispatch(handleColors({...colors , openFill : v}))
        }else if(k =='close'){
            dispatch(handleColors({...colors , closeFill : v}))
        }else if(k == 'wickOpen'){
            dispatch(handleColors({...colors , openWick : v}))
        }else if(k == 'wickClose'){
            dispatch(handleColors({...colors , closeWick : v}))
        }else if(k == 'borderOpen'){
            dispatch(handleColors({...colors , openBorder : v}))
        }else if(k == 'borderClose'){
            dispatch(handleColors({...colors , closeBorder : v}))
        }else if(k == 'lastValueColor'){
            dispatch(handleColors({...colors , lastValueColor : v}))
        }


    }

    return (
        <div>
            <div>
            <span className="titleSetting">CANDLES</span>
            {/* BODY COLOR */}
            <div className="colorsSection">
                <div>
                    <input type="checkbox"  onChange={()=> handleColor('checkFill' , true)} checked={colors.fillCheck}/>
                    <label>Body</label>
                </div>
                <div>
                    <input type="color" value={colors.closeFill} onChange={(e)=> handleColor('close' , e.target.value)} disabled={!colors.fillCheck}/>
                    <input type="color" value={colors.openFill} onChange={(e)=> handleColor('open' , e.target.value)} disabled={!colors.fillCheck}/>
                </div>
            </div>
            <div className="colorsSection">
                <div>
                    <input type="checkbox" onChange={()=> handleColor('checkBorder' , true)} checked={colors.borderCheck}/>
                    <label>Border</label>
                </div>
                <div>
                    <input type="color" value={colors.closeBorder} onChange={(e)=> handleColor('borderClose' , e.target.value)} disabled={!colors.borderCheck}/>
                    <input type="color" value={colors.openBorder} onChange={(e)=> handleColor('borderOpen' , e.target.value)} disabled={!colors.borderCheck}/>
                </div>
            </div>
            <div className="colorsSection">
                <div>
                    <input type="checkbox" onChange={()=> handleColor('checkWick' , true)} checked={colors.wickCheck}/>
                    <label>Wick</label>
                </div>
                <div>
                    <input type="color" value={colors.closeWick} onChange={(e)=> handleColor('wickClose' , e.target.value)} disabled={!colors.wickCheck}/>
                    <input type="color" value={colors.openWick} onChange={(e)=> handleColor('wickOpen' , e.target.value)} disabled={!colors.wickCheck}/>
                </div>
            </div>
            </div>
            <div>
                <span className="titleSetting">PRICE LINES</span>
                <div className="colorsSection">
                <div>
                    <input type="checkbox" onChange={()=> handleColor('lastValueCheck' , true)} checked={colors.lastValueCheck}/>
                    <label>Last</label>
                </div>
                <div>
                    <input type="color" value={colors.lastValueColor} onChange={(e)=> handleColor('lastValueColor' , e.target.value)} disabled={!colors.lastValueCheck}/>
                </div>
            </div>

            </div>
        </div>
    )
}