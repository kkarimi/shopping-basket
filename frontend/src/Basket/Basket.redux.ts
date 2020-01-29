import API from './API'
import { ICurrency } from './API';
const basketAPI = new API()

export interface BasketItem {
  name: string,
  price: number
}

export interface BasketData {
  items?: BasketItem[]
  discountItems?: string[]
  subtotal?: number
  discountAmt?: number
  total?: number
  currency?: string
}

export interface BasketState {
  isLoading: boolean
  data?: BasketData
  hasError: boolean
  error?: string
}

interface ActionCreator {
  type: ActionType
  id?: string
  data?: any
  fieldErrors?: any
  error?: string
}


export const initialState: BasketState = {
  isLoading: false,
  hasError: false,
}

export enum ActionType {
  GET_BASKET_START = "GET_BASKET_START",
  GET_BASKET_RECEIVE = "GET_BASKET_RECEIVE",
  GET_BASKET_ERROR = "GET_BASKET_ERROR",
  ADD_BASKET_ITEM_START = "ADD_BASKET_ITEM_START",
  ADD_BASKET_ITEM_DONE = "ADD_BASKET_ITEM_DONE",
  SET_BASKET_CURRENCY = "SET_BASKET_CURRENCY",
  RESET_BASKET = "RESET_BASKET"
}

export const requestGetBasket = (): ActionCreator => ({
  type: ActionType.GET_BASKET_START,
})

export const setBasketItem = (): ActionCreator => ({
  type: ActionType.ADD_BASKET_ITEM_START,
})


export const setBasket = (data: any): ActionCreator => ({
  type: ActionType.GET_BASKET_RECEIVE,
  data,
})

export const setBasketCurrency = (currency: ICurrency): ActionCreator => ({
  type: ActionType.SET_BASKET_CURRENCY,
  data: { currency },
})

export const getBasketError = (): ActionCreator => ({
  type: ActionType.GET_BASKET_ERROR,
})

export const startBasketReset = (): ActionCreator => ({
  type: ActionType.RESET_BASKET,
})


export const retrieveBasket = () => async (
  dispatch: any,
  getState: any
): Promise<void> => {
  try {
    dispatch(requestGetBasket())
    const basket = await basketAPI.loadBasket()
    dispatch(setBasket(basket))
  } catch (err) {
    console.log(err)
    dispatch(getBasketError())
  }
}

export const changeCurrency = (currency: ICurrency) => async (
  dispatch: any,
  getState: any
  ): Promise<void> => {
    try {
      basketAPI.setCurrency(currency)
      dispatch(setBasketCurrency(currency))
      dispatch(requestGetBasket())
      const basket = await basketAPI.loadBasket()
      dispatch(setBasket(basket))
    } catch (err) {
    console.log(err)
    dispatch(getBasketError())
  }
}

export const addItemToBasket = (item: string) => async (
  dispatch: any,
  getState: any
  ): Promise<void> => {
  try {
    dispatch(setBasketItem())
    const basket = await basketAPI.addItemToBasket(item)
    dispatch(setBasket(basket))
  } catch (err) {
    console.log(err)
    dispatch(getBasketError())
  }
}

export const resetBasket = () => async (
  dispatch: any,
  getState: any
  ): Promise<void> => {
  try {
    dispatch(startBasketReset())
    const basket = await basketAPI.resetBasket()
    dispatch(setBasket(basket))
  } catch (err) {
    console.log(err)
    dispatch(getBasketError())
  }
}