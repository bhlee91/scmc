const KAKAO_KEY = {
  REST_API_KEY: "1350e8c73caff861aa456734c6c40f6f",
  REDIRECT_URL: "http://localhost:3000/LogIn/kid"
}

export const NAVER_KEY = {
  CLIENT_ID: "_OKuc7UYmVLMPYx0UYhc",
  CLIENT_SECRET: "ky5YnBxks7"
}

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY.REST_API_KEY}&redirect_uri=${KAKAO_KEY.REDIRECT_URL}&response_type=code`;