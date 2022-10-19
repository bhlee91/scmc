import request from "request"

const BASE_URL = "/customer"

export const getTerms = (termsType, expDiv, useYn) => {
  return request({
    url: `${BASE_URL}/terms/termstype`,
    method: "get",
    params: {
      termsType, expDiv, useYn
    }
  })
}