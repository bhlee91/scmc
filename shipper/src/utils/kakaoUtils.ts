const DATA = {
  REST_API_KEY: "1350e8c73caff861aa456734c6c40f6f",
  REDIRECT_URL: "http://localhost:3000/LogIn/kid"
}

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${DATA.REST_API_KEY}&redirect_uri=${DATA.REDIRECT_URL}&response_type=code`;