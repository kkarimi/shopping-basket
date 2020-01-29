export enum IDiscountType {
  PERCENTAGE = "PERCENTAGE",
  BOGOF = "BOGOF"
}

export interface ISpecialOffer {
  itemName: string
  discountType: IDiscountType
  percentageDiscount?: number
  buyMinimum?: number
  discountAmount?: number
}

export interface ICurrencyResult {
  quotes: {
    USDGBP: number
    USDEUR: number
  }
  success: boolean
}
export interface ICurrencyAPIResult {
  data: ICurrencyResult
}

export interface IShopPrices {
  [item: string]: number
}

export interface IExchangeRates {
  [key: string]: number
}

export interface IBasketConfig {
  items: string[]
  currency: string
  prices: IShopPrices
  discounts: ISpecialOffer[]
  supportedCurrencies: string[]
}
