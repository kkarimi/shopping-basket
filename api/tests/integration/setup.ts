export { expect } from "chai"
import * as sinon from "sinon"

export const SANDBOX = sinon.createSandbox()

afterEach(() => {
  SANDBOX.restore()
})
