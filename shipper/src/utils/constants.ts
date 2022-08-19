export const KAKAO_KEY = {
  GRANT_TYPE_C: "authorization_code",
  GRANT_TYPE_R: "refresh_token",
  REST_API_KEY: process.env.REACT_APP_KAKAO_REST_API_KEY
}

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY.REST_API_KEY}&redirect_uri=http://localhost:3000/LogIn/kid&response_type=code`;

export const NAVER_KEY = {
  GRANT_TYPE_C: "authorization_code",
  GRANT_TYPE_R: "refresh_token",
  GRANT_TYPE_D: "delete",
  CLIENT_ID: process.env.REACT_APP_NAVER_CLIENT_ID,
  CLIENT_SECRET: process.env.REACT_APP_NAVER_CLIENT_SECRET
}