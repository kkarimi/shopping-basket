import { connect } from 'react-redux'
import { State } from './store'
import { retrieveBasket, addItemToBasket, BasketData, resetBasket, changeCurrency } from './Basket/Basket.redux';

import {BasketPage} from './BasketPage'
import { ICurrency } from './Basket/API';

export interface StateProps {
  isLoading: boolean
  basket?: BasketData
  error?: string
}
export interface DispatchProps {
  getBasket: () => void,
  addItem: (itemName: string) => void
  resetBasket: () => void,
  changeCurrency: (currency: ICurrency) => void
}

const mapStateToProps = (state: State): StateProps => {
  console.log({state})
  return ({
    isLoading: state.basket.isLoading,
    basket: state.basket.data,
    error: state.basket.error,
  })
}
const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getBasket: () => dispatch(retrieveBasket()),
  addItem: (itemName: string) => dispatch(addItemToBasket(itemName)),
  resetBasket: () => dispatch(resetBasket()),
  changeCurrency: (currency: ICurrency) => dispatch(changeCurrency(currency)),
})
export const BasketContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketPage)
