import * as mocks from "../fixtures"

import { getLiveExchange } from "../../utils"
jest.mock("../../utils")

import Basket from "../../Basket"
import { defaultBasket } from "../../dataStore"
// @ts-ignore-next
getLiveExchange.mockReturnValue(mocks.exchangeRates)

let newBasket
describe("Basket", () => {
  beforeAll(() => {
    newBasket = new Basket(defaultBasket)
  })

  it("Is defined and returns an object", () => {
    expect(Basket).toBeDefined()
    expect(typeof new Basket(defaultBasket)).toBe("object")
  })

  it("Gets public config", () => {
    const config = newBasket.config()
    expect(config).toHaveProperty("exchangeRatesLoaded")
    expect(config.exchangeRatesLoaded).toEqual(false)
  })

  it("Gets total", () => {
    const total = newBasket.total()
    expect(total).toHaveProperty("total")
    expect(total.items.length).toEqual(5)
  })

  it("Gets basket catalogue and it has the right amount of items", () => {
    const catalogue = newBasket.catalogue()
    expect(catalogue).toHaveLength(5)
    expect(catalogue[0]).toHaveProperty("name")
  })

  it("Gets basket catalogue and it has the right amount of items", () => {
    const customBasket = {
      ...defaultBasket,
      items: ["Apples", "Soup", "Orange"]
    }
    const newBasket = new Basket(customBasket)
    const catalogue = newBasket.catalogue()
    expect(catalogue).toHaveLength(3)
  })

  it("Loads currency exchange rates", async () => {
    expect(getLiveExchange).toHaveBeenCalledTimes(0)
    await newBasket.loadCurrencies()
    expect(getLiveExchange).toHaveBeenCalledTimes(1)
  })
})
