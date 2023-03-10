import {ADD , SEARCH , REPLAY , COLORS , BACKGROUNDCHANGE, REPLAYVALUE , DATA, REPLAYSPEED , TIMEFRAMEINPUT , TOOL, UNDO_REDO} from './action'

const initital = {
    ReplaySpeed : 500 ,
    data : [],
    chartType : 'Candles',
    searchValue:'ACC',
    replay:false,
    replayValue : 0,
    timeFrameInput : false ,
    colors :{
        openFill : "#26a69a",
        closeFill:"#ef5350",
        fillCheck:true,
        wickCheck:true,
        borderCheck:true,
        lastValueCheck:true,
        openWick : "#26a69a",
        closeWick : "#ef5350",
        openBorder:"#26a69a",
        closeBorder:"#ef5350",
        lastValueColor : "#FFA500",
    },
    backgroundColorType : {
        backgroundType : 'solid',
        solid : {
            color : "#edf2ff"

        },
        gradient:{
            color1 : "#edf2ff",
            color2 : "#fff"
        }

    }
}
export const reducer = (state = initital , {type , payload})=>{
    switch(type){
        case DATA:
            return {...state , data : payload}
        case ADD:
            return {...state , chartType:payload}
        case SEARCH:
            return {...state , searchValue : payload}
        case REPLAY:
            return {...state , replay: payload}
        case COLORS:
            return {...state , colors: payload}
        case BACKGROUNDCHANGE:
            return {...state , backgroundColorType : payload}
        case REPLAYVALUE:
            return {...state , replayValue : payload}
        case REPLAYSPEED:
            return {...state , ReplaySpeed : payload}
        case TIMEFRAMEINPUT:
            return {...state , timeFrameInput : payload}
        case TOOL:
            return {...state , tool:payload}
        case UNDO_REDO:
            return payload
        default:
            return state
    }
}