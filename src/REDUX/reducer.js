import {ADD} from './action'
const initital = {
    chartType : 'Candles'
}
export const reducer = (state = initital , {type , payload})=>{
    switch(type){
        case ADD:
            return {chartType:payload}
        default:
            return state
    }
}