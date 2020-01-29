import * as express from "express"
import * as cors from 'cors'
import { basketFactory } from "./utils"
import { defaultBasket } from "./dataStore"

const app = express()
app.use(cors())
app.use(express.json())
const port = 8080

let marketBasket = basketFactory(defaultBasket)

app.get("/status", async (req, res) => {
  res.send({
    ver: '1.0',
    name: 'basket_service',
    status: 'OK'
  })
})

app.get("/basket/:currency?", async (req, res) => {
  const { currency } = req.query
  try {
    const total = await marketBasket.totalInCurrency(currency)
    res.send(total)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

app.post("/basket/:currency?", async (req, res) => {
  const { currency } = req.query
  const { item } = req.body
  marketBasket.addItem(item)
  const total = await marketBasket.totalInCurrency(currency)
  res.send(total)
  try {
  } catch (err) {
    res.status(400).send(err.message)
  }
})

app.post("/reset", async (req, res) => {
  marketBasket = basketFactory(defaultBasket)
  const total = await marketBasket.total()
  res.send(total)
})


app.listen(port, () => {
  console.log(`API started at http://localhost:${port}`)
})

export default app