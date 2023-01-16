export const ADD = 'ADD'
export const SEARCH = 'SEARCH'
export const REPLAY = 'REPLAY'
export const COLORS = 'COLORS'
export const BACKGROUNDCHANGE = 'BACKGROUNDCHANGE'
export const REPLAYVALUE = 'REPLAYVALUE'
export const DATA = 'DATA'
export const REPLAYSPEED = 'REPLAYSPEED'

export const handleData = (payload)=>{
    return {type : DATA , payload}
}
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

export const handleReplayValue = (payload)=>{
    return {type : REPLAYVALUE , payload}
}

export const handleReplaySpeed = (payload)=>{
    return {type : REPLAYSPEED , payload}
}