import { KAKAO_KEY } from "./constants";

export const initKaKaoLogin = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY.REST_API_KEY}&redirect_uri=http://localhost:3000/LogIn/kid&response_type=code`;