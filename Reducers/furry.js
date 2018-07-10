import * as firebase from "firebase"

export function _INIT() {
  return {
    type: "INIT"
  }
}

export function _SET_COUNTRY(data) {
  return {
    type: "SET_COUNTRY",
    payload: data
  }
}

export function _GET_FURRYS(data) {
  return {
    type: "GET_FURRYS",
    payload: data
  }
}

export function _GET_MY_FURRYS(data) {
  return {
    type: "MY_FURRYS",
    payload: data
  }
}

export const SET_COUNTRY = countryID => dispatch => {
  dispatch(_SET_COUNTRY(countryID))
}

export const GET_FURRYS = countryID => dispatch => {
  dispatch(_INIT())
  try {
    firebase
      .database()
      .ref("posts")
      .orderByChild("country")
      .equalTo(countryID)
      .limitToLast(35)
      .on("value", function(snapshot) {
        var items = []

        snapshot.forEach(item => {
          items.push({ ...item.val(), key: item.key })
        })
        dispatch(_GET_FURRYS(items))
      })
  } catch (e) {
    console.log("failed")
  }
}

// export const LOADMORE_FURRYS = furry => dispatch => {
//   //   dispatch(_INIT())
//   firebase
//     .database()
//     .ref("posts")
//     .orderByKey()
//     .endAt(furry.key)
//     .limitToLast(2)
//     .on("value", function(snapshot) {
//       var items = []
//       snapshot.forEach((item, index) => {
//         if (furry.key !== item.key) {
//           const data = item.val()
//           data["key"] = item.key
//           items.unshift(data)
//         }
//       })
//       dispatch(_LOAD_MORE_FURRYS(items))
//     })
// }

export const GET_MY_FURRYS = uid => dispatch => {
  firebase
    .database()
    .ref("posts")
    .orderByChild("author")
    .equalTo(uid)
    .on("value", function(snapshot) {
      var items = []

      snapshot.forEach(item => {
        items.unshift({ ...item.val(), key: item.key })
      })
      dispatch(_GET_MY_FURRYS(items))
    })
}

const initialState = {
  furrys: [],
  myfurrys: [],
  loading: false,
  countryID: ""
}

export function furrys(state = initialState, action) {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        loading: true
      }
    case "SET_COUNTRY":
      return {
        ...state,
        countryID: action.payload
      }
    case "GET_FURRYS":
      return {
        ...state,
        furrys: action.payload,
        loading: false
      }
    case "MY_FURRYS":
      return {
        ...state,
        myfurrys: action.payload
      }
    default:
      return state
  }
}
