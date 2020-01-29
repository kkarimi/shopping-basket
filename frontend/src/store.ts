import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { basketReducer } from './BasketReducder'
import { BasketState } from './Basket/Basket.redux';

export const store = createStore(
  combineReducers({
    basket: basketReducer,
  }),
  {},
  composeWithDevTools(applyMiddleware(thunk))
)

export interface State {
  basket: BasketState
}