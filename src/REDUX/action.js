export const ADD = 'ADD'
export const SEARCH = 'SEARCH'
export const REPLAY = 'REPLAY'
export const COLORS = 'COLORS'
export const BACKGROUNDCHANGE = 'BACKGROUNDCHANGE'
export const REPLAYVALUE = 'REPLAYVALUE'
export const DATA = 'DATA'
export const REPLAYSPEED = 'REPLAYSPEED'
export const TIMEFRAMEINPUT = 'TIMEFRAMEINPUT'
export const TOOL = 'TOOL'
export const UNDO_REDO = 'UNDO_REDO'

export const handleUndoRedo = (payload)=>{
    return {type : UNDO_REDO , payload}
}

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

export const handleTimeFrameInput = (payload)=>{
    return {type : TIMEFRAMEINPUT , payload}
}

export const handleTool = (payload)=>{
    return {type : TOOL , payload}
}