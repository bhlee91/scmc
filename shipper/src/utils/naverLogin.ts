import { NAVER_KEY } from './constants';

const { naver } = window as any;

export const initNaverLogin = new naver.LoginWithNaverId({
  clientId: NAVER_KEY.CLIENT_ID,
  callbackUrl: "http://localhost:3000/LogIn/nid",
  isPopup: false,
  loginButton: { color: 'green', type: 3, height: '36' }
})
