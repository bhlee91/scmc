import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { useAppDispatch } from '../../store';
import userSlice from '../../slice/user';
import tokenSlice from '../../slice/token';

import { KAKAO_KEY } from '../../utils/constants';

export default function KaKaoLogin() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const CODE = location.search.substring("?code=".length);
    const GRANT_TYPE = KAKAO_KEY.GRANT_TYPE_C;
    const REDIRECT_URI = "http://localhost:3000/LogIn/kid";
    const REST_API_KEY = KAKAO_KEY.REST_API_KEY;

    axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${CODE}`, 
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    })
    .then(res => {
      const TOKEN_DATA = res.data

      dispatch(
        tokenSlice.actions.SET_TOKEN({
          accessToken: TOKEN_DATA.access_token,
          refreshToken: TOKEN_DATA.refresh_token,
          expireTime: TOKEN_DATA.expires_in,
          social: "KAKAO"
        })
      )

      return res.data
    })
    .then(data => {
      const ACCESS_TOKEN = data.access_token
      
      axios.post("http://localhost:8080/member/login/social", 
      {
        token: ACCESS_TOKEN,
        social: "KAKAO"
      })
      .then(res => {
        const DATA = JSON.parse(res.data.data.res)
        const PROFILE = DATA.kakao_account

        dispatch(
          userSlice.actions.SET_LOGIN({
            email: PROFILE.email,
            userName: DATA.properties.nickname,
            socialInfo: "KAKAO"
          })
        )

        navigate("/")
      })
    })
    .catch(() => {
      navigate("/LogIn")
    })
  })

  return (
    <div>카카오 로그인 페이지...</div>
  )
}