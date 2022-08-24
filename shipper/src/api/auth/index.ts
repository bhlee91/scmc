import request from "../../request";

const BASE_URL = "/auth"

export function getNaverAccessToken(code: string, state: string) {
  return request({
    url: `${BASE_URL}/naver/callback?code=${code}&state=${state}`,
    method: "get"
  })
}