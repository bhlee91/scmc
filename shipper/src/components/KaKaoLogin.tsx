import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { useAppDispatch } from '../store';
import userSlice from '../slice/user';

export default function KaKaoLogin() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const CODE = location.search.substring("?code=".length);
    const GRANT_TYPE = "authorization_code";
    const REDIRECT_URI = "http://localhost:3000/LogIn/kid";
    const REST_API_KEY = "1350e8c73caff861aa456734c6c40f6f";

    axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${CODE}`, 
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    })
    .then(res => {
      dispatch(
        userSlice.actions.setAccessToken({
          accessToken: res.data.access_token,
          socialInfo: 'kakao'
        })
      )

      return res.data
    })
    .then(data => {
      const ACCESS_TOKEN = data.access_token
      
      axios.post("http://localhost:8080/member/login/social", 
      {
        token: ACCESS_TOKEN,
        social: "kakao"
      })
      .then(res => {
        const DATA = JSON.parse(res.data.data.res)
        const PROFILE = DATA.kakao_account

        dispatch(
          userSlice.actions.setUser({
            email: PROFILE.email,
            userName: DATA.properties.nickname,
            accessToken: ACCESS_TOKEN,
            socialInfo: 'kakao'
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