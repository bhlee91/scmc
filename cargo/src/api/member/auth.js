import request from "src/request";

const BASE_URL = "/auth"

export const initNaverLogin = () => {
  return request({
    url: `${BASE_URL}/naver`,
    method: "post"
  })
}

export const getNaverAccessToken = (code, state) => {
  return request({
    url: `${BASE_URL}/naver/callback?code=${code}&state=${state}`,
    method: "get"
  })
}

export const initKaKaoLogin = () => {
  return request({
    url: `${BASE_URL}/kakao`,
    method: "post"
  })
}

export const getKaKaoAccessToken = (code) => {
  return request({
    url: `${BASE_URL}/kakao/callback?code=${code}`,
    method: "get"
  })
}

export const adminLogin = (email, password) => {
  const data = {
    id: email,
    password: password
  }
  console.log(data)
  return request({
    url: `${BASE_URL}/admin`,
    method: "post",
    data: data
  })
}