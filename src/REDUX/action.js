export const ADD = 'ADD'
export const SEARCH = 'SEARCH'
export const handleChartType = (payload)=>{
    return {type:ADD , payload}
}

export const handleSearchValue = (payload)=>{
    return {type:SEARCH , payload}
}