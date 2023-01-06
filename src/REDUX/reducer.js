import {ADD , SEARCH , REPLAY} from './action'

const initital = {
    chartType : 'Candles',
    searchValue:'ACC',
    replay:false
}
export const reducer = (state = initital , {type , payload})=>{
    switch(type){
        case ADD:
            return {...state , chartType:payload}
        case SEARCH:
            return {...state , searchValue : payload}
        case REPLAY:
            return {...state , replay: !state.replay}
        default:
            return state
    }
}