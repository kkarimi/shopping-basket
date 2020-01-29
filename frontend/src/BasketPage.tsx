import React, { useEffect } from 'react'
import { DispatchProps, StateProps } from './BasketContainer'
import { BasketItem } from './Basket/Basket.redux';
import { ICurrency } from './Basket/API';

interface Props extends DispatchProps, StateProps { }

const formatCurrency = (num: number = 0, currency: string): string => {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  });
  return formatter.format(num)
}

const Discounts = (basketItems: string[] = []) => {
  const counts = basketItems.reduce((acc: any, value: string) => ({
    ...acc,
    [value]: (acc[value] || 0) + 1
  }), {});

  const uniqueArray = [...new Set(basketItems)]
  return uniqueArray.map((basketItems: string, index: number) => {
    return (
      <div key={index}>{basketItems} x {counts[basketItems]}</div>
    )
  })
}

const ShopBasketItems = (basketItems: BasketItem[], currency: string) => {
  return basketItems.map((item: BasketItem, index: number) => {
    return (
      <div key={index}>
        {item.name} {/* - {formatCurrency(item.price, currency)} */}
      </div>
    )
  })
}

export const BasketPage = ({ basket, getBasket, addItem, resetBasket, changeCurrency, isLoading }: Props): any => {
  useEffect(() => {
    getBasket()
  }, [getBasket])
  if (isLoading || !basket) {
    return <>Loading...</>
  }

  if (
    basket &&
    basket.items &&
    basket.currency &&
    basket.discountItems) {

    return (
      <>
        <h1>Shopping Basket</h1>

        <button onClick={(e) => changeCurrency(ICurrency.EUR)}>EUR</button>
        <button onClick={(e) => changeCurrency(ICurrency.GBP)}>GBP</button>
        <button onClick={(e) => changeCurrency(ICurrency.USD)}>USD</button>

        <h2>Available Discounts</h2>
        <>{Discounts(basket.discountItems)}</>

        <h2>Basket Items</h2>
        <>{ShopBasketItems(basket.items, basket.currency)}</>
        <h2>
          Add
        </h2>
        <button onClick={(e) => addItem('Apple')}>Apple</button>
        <button onClick={(e) => addItem('Orange')}>Orange</button>
        <button onClick={(e) => addItem('Milk')}>Milk</button>
        <br />
        <button onClick={(e) => resetBasket()}>Reset</button>

        <h2>Totals</h2>
        <p>
          Subtotal: {formatCurrency(basket.subtotal, basket.currency)} <br />
          Total: {formatCurrency(basket.total, basket.currency)}<br />
        </p>
      </>
    )
  }
}
