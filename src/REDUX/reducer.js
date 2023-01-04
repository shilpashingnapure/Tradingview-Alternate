import {ADD , SEARCH} from './action'

const initital = {
    chartType : 'Candles',
    searchValue:'ACC'
}
export const reducer = (state = initital , {type , payload})=>{
    switch(type){
        case ADD:
            return {...state , chartType:payload}
        case SEARCH:
            return {...state , searchValue : payload}
        default:
            return state
    }
}