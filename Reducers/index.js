import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import {furrys} from './furry'


export const AppReducer = combineReducers({
    furrys: furrys,
})


export const store = createStore(
    AppReducer,
    applyMiddleware(
		ReduxThunk
	)
)


