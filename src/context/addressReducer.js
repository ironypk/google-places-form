import { SET_ADDRESS, POST_ADDRESS } from "./types"


const handlers = {
    [SET_ADDRESS] : (state,action) => {
        return {...state,address : {...state.address,...action.payload}}
    },
    [POST_ADDRESS]:(state,action)=>{
        return {...state,address : action.payload}
    },
    DEFAULT : state => state
}


export const addressReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state,action)
}