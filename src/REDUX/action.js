export const ADD = 'ADD'
export const SEARCH = 'SEARCH'
export const REPLAY = 'REPLAY'
export const COLORS = 'COLORS'
export const BACKGROUNDCHANGE = 'BACKGROUNDCHANGE'

export const handleChartType = (payload)=>{
    return {type:ADD , payload}
}

export const handleSearchValue = (payload)=>{
    return {type:SEARCH , payload}
}

export const handleReplayCheck = (payload)=>{
    return {type:REPLAY , payload}
}

export const handleColors = (payload)=>{
    return {type:COLORS , payload}
}

export const handleBackgroundColor = (payload)=>{
    return {type : BACKGROUNDCHANGE , payload}
}
