export enum ICurrency {
  GBP = "GBP",
  USD = "USD",
  EUR = "EUR"
}

export default class API {
  private currency: ICurrency
  private url: string

  constructor(
    currency: ICurrency = ICurrency.USD,
    apiURL: string = "http://localhost:8080"
  ) {
    this.currency = currency
    this.url = apiURL
  }
  public loadBasket = async () => {
    const basketAPI = await fetch(
      `${this.url}/basket/?currency=${this.currency}`
    ).then(data => data.json())
    return basketAPI
  }

  public addItemToBasket = async (item: string) => {
    const basketAPI = await fetch(
      `${this.url}/basket/?currency=${this.currency}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ item })
      }
    ).then(data => data.json())
    return basketAPI
  }

  public resetBasket = async () => {
    const basketAPI = await fetch(`${this.url}/reset`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(data => data.json())
    return basketAPI
  }
  public setCurrency = (currency: ICurrency) => {
    if (!ICurrency[currency]) {
      throw new Error("CURRENCY_UNAVAILABLE")
    }
    this.currency = currency
  }
}
