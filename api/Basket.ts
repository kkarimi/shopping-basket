import { sum, formatMoney, getLiveExchange, getCurrencySymbol } from "./utils"
import {
  IShopPrices,
  IExchangeRates,
  ISpecialOffer,
  ICurrencyResult,
  IBasketConfig
} from "./interfaces"

export default class Basket {
  private items: string[]
  private currency: string
  private currencySymbol: string
  private prices: IShopPrices
  private discounts: ISpecialOffer[]
  private exchangeRates: IExchangeRates
  private exchangeRatesLoaded: boolean = false
  private supportedCurrencies: string[]

  public async loadExchangeRates(force: boolean = false) {
    if (this.exchangeRatesLoaded === true && force !== false) return
    this.exchangeRates = await this.loadCurrencies()
    this.exchangeRatesLoaded = true
  }

  constructor(basketConfig: IBasketConfig) {
    this.items = basketConfig.items
    this.prices = basketConfig.prices
    this.discounts = basketConfig.discounts
    this.currency = basketConfig.currency
    this.exchangeRatesLoaded = false
    this.supportedCurrencies = basketConfig.supportedCurrencies
    this.currencySymbol = getCurrencySymbol(this.currency)
  }
  public addItem(itemName): void {
    this.items = [...this.items, itemName]
  }
  public async loadCurrencies(): Promise<IExchangeRates> {
    if (this.exchangeRatesLoaded === true) return this.exchangeRates
    const exchangeRates: ICurrencyResult = await getLiveExchange()
    if (exchangeRates.success !== true)
      throw new Error("EXCHANGE_RATES_RETRIEVE_ERROR")

    const gbpToUSD = 1 / exchangeRates.quotes.USDGBP
    const gbpToEUR = gbpToUSD * exchangeRates.quotes.USDEUR

    return {
      USD: gbpToUSD,
      EUR: gbpToEUR
    }
  }

  private getPrice(itemName: string): number {
    return this.prices[itemName]
  }

  private discountOffer(itemName: string): string {
    const discountForItem = this.discounts.filter(
      discount => discount.itemName === itemName
    )
    if (discountForItem.length < 1) {
      return `No offers for ${itemName}`
    }
    const offer = discountForItem[0]
    if (offer.discountType === "PERCENTAGE") {
      return `${itemName} %${offer.percentageDiscount} off`
    }
    if (offer.discountType === "BOGOF") {
      return `Buy ${offer.buyMinimum} ${itemName} and get ${formatMoney(offer.discountAmount)} off`
    }
  }

  /**
   * Returns the discount amount for an item
   *
   * @remarks
   * This method is part of the Basket class
   *
   *
   * @param item - This is the item name
   * @returns The discounted price for the item
   *
   */
  private discountAmount(item): number {
    const discountForItem = this.discounts.filter(
      discount => discount.itemName === item
    )
    if (discountForItem.length < 1) return 0

    const itemPrice = this.getPrice(item)
    const offer = discountForItem[0]
    if (offer.discountType === "PERCENTAGE") {
      return (offer.percentageDiscount * itemPrice) / 100
    }
    if (offer.discountType === "BOGOF") {
      const numberOfSimilarItems = this.items.filter(
        basketItem => basketItem === item
      )
      if (numberOfSimilarItems.length >= offer.buyMinimum) {
        // offer qualified
        return itemPrice - offer.discountAmount
      }
      // could have qualified for the offer if had
      // ${offer.buyMinimum} number of ${numberOfSimilarItems}
      return 0
    }
  }
  private subtotal(): number {
    const costs: number[] = this.items.map(item => this.getPrice(item))
    const subtotalCosts: number = sum(costs)
    return subtotalCosts
  }
  private totalDiscounts(): number {
    return formatMoney(sum(this.items.map(item => this.discountAmount(item))))
  }
  private discountedItems(): string[] {
    return this.items.map(item => this.discountOffer(item)).filter(arr => arr)
  }
  public total() {
    const discountItems = this.discountedItems()
    const subtotal = formatMoney(this.subtotal())
    const discountAmt = this.totalDiscounts()
    const total = formatMoney(subtotal - discountAmt)
    return {
      items: this.items.map(item => {
        return {
          name: item,
          price: this.getPrice(item)
        }
      }),
      discountItems,
      subtotal,
      discountAmt,
      total,
      currency: this.currency
    }
  }
  public async totalInCurrency(toCurrency: string = "GBP") {
    if (!this.supportedCurrencies.includes(toCurrency)) {
      throw new Error("CURRENCY_UNAVAILABLE")
    }
    if (toCurrency === "GBP") return this.total()
    if (this.exchangeRatesLoaded !== true) {
      console.log('Loading rates...')
      await this.loadExchangeRates()
    }
    const discountItems = this.discountedItems()
    const subtotal = formatMoney(
      this.subtotal() * this.exchangeRates[toCurrency]
    )
    const discountAmt = formatMoney(
      this.totalDiscounts() * this.exchangeRates[toCurrency]
    )
    const total = formatMoney(
      (subtotal - discountAmt) * this.exchangeRates[toCurrency]
    )
    return {
      items: this.items.map(item => {
        return {
          name: item,
          price: this.getPrice(item)
        }
      }),
      discountItems,
      subtotal,
      discountAmt,
      total,
      currency: toCurrency
    }
  }
  public catalogue() {
    return this.items.map(item => {
      return {
        name: item,
        price: this.getPrice(item),
        offer: this.discountOffer(item),
        final_price: formatMoney(
          this.getPrice(item) - this.discountAmount(item)
        )
      }
    })
  }
  public config() {
    return {
      items: this.items,
      prices: this.prices,
      itemCount: this.items.length,
      currency: this.currency,
      discounts: this.discounts,
      exchangeRatesLoaded: this.exchangeRatesLoaded
    }
  }
}
