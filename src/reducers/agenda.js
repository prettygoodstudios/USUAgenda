import { GET_AGENDA } from "../actions/actions";

const INIT_STATE = {
    items: []
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case GET_AGENDA:
            return {
                ...state
            }
        default:
            return{
                ...state
            }
    }
}