import { BasketState, initialState, ActionType } from "./Basket/Basket.redux"

export const basketReducer = (
  state = initialState,
  action: any
): BasketState => {
  switch (action.type) {
    case ActionType.GET_BASKET_START:
      return {
        ...state,
        isLoading: true,
        hasError: false
      }
    case ActionType.GET_BASKET_RECEIVE:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        hasError: false
      }
      case ActionType.ADD_BASKET_ITEM_START:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case ActionType.ADD_BASKET_ITEM_DONE:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
    default:
      return state
  }
}
