import {
  IShopPrices,
  ISpecialOffer,
  IBasketConfig,
  IDiscountType
} from "./interfaces"

export const DEFAULT_CURRENCIES: string[] = ["GBP", "USD", "EUR"]

export const prices: IShopPrices = {
  Soup: 0.65,
  Bread: 0.8,
  Milk: 1.15,
  Apple: 1.0,
  Orange: 1.0
}
export const items = ["Apple", "Soup", "Orange", "Milk", "Milk"]

const offer1: ISpecialOffer = {
  itemName: "Apple",
  discountType: IDiscountType.PERCENTAGE,
  percentageDiscount: 10
}

const offer2: ISpecialOffer = {
  itemName: "Milk",
  discountType: IDiscountType.BOGOF,
  buyMinimum: 2,
  discountAmount: 0.50
}

export const discounts: ISpecialOffer[] = [offer1, offer2]

const defaultCurrency: string = "GBP"

export const defaultBasket: IBasketConfig = {
  items,
  prices,
  discounts,
  currency: defaultCurrency,
  supportedCurrencies: DEFAULT_CURRENCIES
}
