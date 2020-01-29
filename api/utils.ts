import * as dotenv from "dotenv"
import axios, { AxiosRequestConfig } from "axios"
import Basket from "./Basket"
import { DEFAULT_CURRENCIES } from "./dataStore"
import { IBasketConfig } from "./interfaces"
import { ICurrencyAPIResult, ICurrencyResult } from "./interfaces"

dotenv.config()

if (!process.env.CURRENCY_LAYER_ACCESS_KEY)
  throw new Error("ENV_FILE_NOT_FOUND")
export const CURRENCY_LAYER_ACCESS_KEY: string =
  process.env.CURRENCY_LAYER_ACCESS_KEY

export const formatMoney = (num: number): number => parseFloat(num.toFixed(4))

export const sum = (numberArray: number[]): number => {
  return numberArray.filter(arr => arr).reduce((a, b) => a + b)
}

const apiRequestConstructor = (format?): AxiosRequestConfig => {
  let apiUrl = `http://api.currencylayer.com/live?access_key=${CURRENCY_LAYER_ACCESS_KEY}`
  apiUrl = `${apiUrl}&currencies=${DEFAULT_CURRENCIES.join(",")}`
  apiUrl = `${apiUrl}&format=${format ? format : 1}`
  const requestConfig: AxiosRequestConfig = { method: "GET", url: apiUrl }

  return requestConfig
}

const apiRequest = async (): Promise<ICurrencyResult> => {
  const apiRequest: AxiosRequestConfig = apiRequestConstructor()
  return axios(apiRequest)
    .then((result: ICurrencyAPIResult) => result.data)
    .catch(error => {
      throw new Error(error.response.data)
    })
}

export const getLiveExchange = async (): Promise<ICurrencyResult> => {
  try {
    const liveCurrencyRequest: ICurrencyResult = await apiRequest()
    return liveCurrencyRequest
  } catch (e) {
    throw new Error("UNEXPECTED_API_RESPONSE")
  }
}

export const basketFactory = (basketConfig: IBasketConfig): Basket => {
  const newBasket = new Basket(basketConfig)
  return newBasket
}

export const getCurrencySymbol = currency => {
  switch (currency) {
    case "GBP":
      return "£"
    case "USD":
      return "$"
    case "EUR":
      return "€"
    default:
      return "£"
  }
}
