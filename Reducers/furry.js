import * as firebase from 'firebase'

export function _GET_FURRYS(data) {
    return {
        type: 'GET_FURRYS',
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


const initialState = {
    furrys: []
}

export function furrys(state = initialState, action) {
    switch (action.type) {
        case "GET_FURRYS" :
            return {
                ...state,
                furrys: action.payload, ...state.furrys
            }
        default:
            return state
    }
}