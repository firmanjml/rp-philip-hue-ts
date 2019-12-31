import C from '../constants';
import { combineReducers } from 'redux';
import _ from 'lodash';

/** 
 * loading
 * * Redux reducer stores loading data to Redux state.
*/
const loading = (state: boolean = false, action) => {
    if (action.type === C.CHANGE_LOADING) {
        return action.payload;
    } else {
        return state;
    }
}

const night_mode = (state: boolean = true, action) => {
    if (action.type === C.CHANGE_THEME) {
        state = action.payload;
        return state;
    } else {
        return state;
    }
}

const search_bridge_complete = (state: boolean = false, action) => {
    if (action.type === C.SEARCH_BRIDGE_COMPLETE) {
        state = action.payload;
        return state;
    } else {
        return state;
    }
}

const search_bridge_loading = (state: boolean = false, action) => {
    if (action.type === C.SEARCH_BRIDGE_LOADING) {
        return action.payload;
    } else {
        return state;
    }
}

const search_bridge_list = (state: Array<object> = [], action) => {
    if (action.type === C.SEARCH_BRIDGE) {
        state = [];
        state.push(...action.payload);
        return state;
    } else if (action.type === C.SEARCH_BRIDGE_CLEAR) {
        return state = [];
    } else {
        return state;
    }
}

const bridge_list = (state: object = {}, action) => {
    if (action.type === C.ADD_BRIDGE) {
        state[action.payload.bridgeid] = action.payload;
        state[action.payload.bridgeid]['username'] = action.username;
        console.log(state);
        return state;
    } else {
        return state;
    }
}

const pairing_bridge = (state: object = {}, action) => {
    if (action.type === C.PAIRING_BRIDGE) {
        state = action.payload;
        return state;
    } else {
        return state;
    }
}

export default combineReducers({
    loading,
    night_mode,
    search_bridge_complete,
    search_bridge_loading,
    search_bridge_list,
    bridge_list,
    pairing_bridge
});