import * as firebase from 'firebase'

export function _GET_FURRYS(data) {
    return {
        type: 'GET_FURRYS',
        payload: data
    }
}

export function _GET_MY_FURRYS(data) {
    return {
        type: 'MY_FURRYS',
        payload: data
    }
}

export const GET_FURRYS = () => (dispatch) => {
    firebase.database().ref('posts').limitToLast(4).on("value", function(snapshot) {
        var items = [];
        snapshot.forEach((item) => {
            items.unshift(item.val())
        });
        dispatch(_GET_FURRYS(items))
    });
}

export const GET_MY_FURRYS = () => (dispatch) => {
    firebase.database().ref('posts').orderByChild("author").equalTo('1sSFXUfT6LPiCaR52GBrTuRhFSs2').on("value", function(snapshot) {
        var items = [];
        
        snapshot.forEach((item) => {
            items.unshift({...item.val(), key: item.key})
            //console.log(item.key)
        });
        dispatch(_GET_MY_FURRYS(items))
    });
}


const initialState = {
    furrys: [],
    myfurrys: []
}

export function furrys(state = initialState, action) {
    switch (action.type) {
        case "GET_FURRYS" :
            return {
                ...state,
                furrys: action.payload, ...state.furrys
            }
            case "MY_FURRYS" :
            return {
                ...state,
                myfurrys: action.payload, ...state.myfurrys
            }
        default:
            return state
    }
}