import { expect, SANDBOX } from "./setup"
import * as request from "supertest"

import app from "../../"

describe("API", () => {
  let result

  after(() => {
    result = null
    SANDBOX.restore()
  })

  describe("#status", () => {
    it("should get status", async () => {
      result = await request(app).get("/status")
      expect(result.status).to.eql(200)
      expect(result.body)
        .to.have.property("name")
        .to.eql("basket_service")
      expect(result.body)
        .to.have.property("ver")
        .to.eql("1.0")
      expect(result.body)
        .to.have.property("status")
        .to.eql("OK")
    })
  })

  describe("#basket", () => {
    it("should get basket total in default currency", async () => {
      result = await request(app).get("/basket")
      expect(result.status).to.eql(200)
      expect(result.body)
        .to.have.property("currency")
        .to.eql("GBP")

      expect(result.body).to.have.property("discountAmt")

      expect(result.body).to.have.property("items")

      expect(result.body)
        .to.have.property("subtotal")
        .to.eql(4.95)

      expect(result.body)
        .to.have.property("total")
        .to.eql(3.55)
    })

    it("should get basket total in EUR currency", async () => {
      result = await request(app).get("/basket/?currency=EUR")
      expect(result.status).to.eql(200)
      expect(result.body)
        .to.have.property("currency")
        .to.eql("EUR")

      expect(result.body).to.have.property("discountAmt")

      expect(result.body).to.have.property("items")

      expect(result.body).to.have.property("subtotal")

      expect(result.body).to.have.property("total")
    })

    it("should get basket total in USD currency", async () => {
      result = await request(app).get("/basket/?currency=USD")
      expect(result.status).to.eql(200)
      expect(result.body)
        .to.have.property("currency")
        .to.eql("USD")

      expect(result.body).to.have.property("discountAmt")

      expect(result.body).to.have.property("items")

      expect(result.body).to.have.property("subtotal")

      expect(result.body).to.have.property("total")
    })
  })
})
