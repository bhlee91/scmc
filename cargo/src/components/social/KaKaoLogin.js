import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAppDispatch } from 'src/store';
import userSlice from 'src/slice/user';
import tokenSlice from 'src/slice/token';

import {
  getKaKaoAccessToken
} from "src/api/member/auth";

const KaKaoLogin = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const CODE = location.search.substring("?code=".length);

    getKaKaoAccessToken(CODE)
    .then(res => {
      console.log(res)
      const TOKEN_INFO = JSON.parse(res.data.token)
      const PROFILE = JSON.parse(res.data.profile)

      dispatch(
        tokenSlice.actions.SET_TOKEN({
          accessToken: TOKEN_INFO.access_token,
          refreshToken: TOKEN_INFO.refresh_token,
          expireTime: TOKEN_INFO.expires_in,
          social: "KAKAO",
          loginTime: Date.now()
        })
      )

      dispatch(
        userSlice.actions.SET_LOGIN({
          email: PROFILE.kakao_account.email,
          userName: PROFILE.kakao_account.profile.nickname,
          social: "KAKAO",
          isLogin: true
        })
      )

      navigate("/")
    })
    .catch(() => {
      navigate("/LogIn")
      alert("로그인 할 수 없습니다.\n다시 로그인해주세요.")
    })
  })

  return (
    <div></div>
  )
}

export default KaKaoLogin;