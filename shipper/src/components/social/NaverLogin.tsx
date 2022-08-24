import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAppDispatch } from '../../store';
import userSlice from '../../slice/user';
import tokenSlice from '../../slice/token';

import {
  getNaverAccessToken
} from "../../api/auth";

export default function NaverLogin() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location)

    const SEARCH_PARAM = location.search.replace("?", "").split("&");
    
    const CODE = SEARCH_PARAM[0].split("=")[1];
    const STATE = SEARCH_PARAM[1].split("=")[1];

    getNaverAccessToken(CODE, STATE)
    .then(res => {
      const TOKEN_INFO = JSON.parse(res.data.token)
      const PROFILE = JSON.parse(res.data.profile).response

      dispatch(
        tokenSlice.actions.SET_TOKEN({
          accessToken: TOKEN_INFO.access_token,
          refreshToken: TOKEN_INFO.refresh_token,
          expireTime: TOKEN_INFO.expires_in,
          social: "NAVER",
          loginTime: Date.now()
        })
      )
      dispatch(
        userSlice.actions.SET_LOGIN({
          name: PROFILE.name,
          email: PROFILE.email,
          phoneNumber: PROFILE.mobile,
          social: "NAVER",
          isLogin: true
        })
      )
    })
    .then(() => {
      navigate("/");
    })

    if (!location.hash) return;
    console.log(location)
    /*
    const HASH_VALUES = location.hash.replace("#", "").split("&");
    
    const ACCESS_TOKEN = HASH_VALUES[0].split("=")[1];
    const EXPIRE_TIME = HASH_VALUES[3].split("=")[1];

    dispatch(
      tokenSlice.actions.SET_TOKEN({
        accessToken: ACCESS_TOKEN,
        expireTime: EXPIRE_TIME,
        social: "NAVER"
      })
    )
    
    axios.post("http://localhost:8080/member/login/social",
    {
      token: ACCESS_TOKEN,
      social: "NAVER"
    })
    .then(res => {
      const PROFILE = JSON.parse(res.data.data.res).response

      dispatch(
        userSlice.actions.SET_LOGIN({
          email: PROFILE.email,
          phoneNumber: PROFILE.mobile,
          userName: PROFILE.name,
          social: "NAVER",
          isLogin: true
        })
      )

      navigate("/");
    })
    .catch(() => {
      navigate("/LogIn")
      alert("로그인 할 수 없습니다.\n다시 로그인해주세요.")
    });
    */
  })

  return (
    <div>네이버 로그인...</div>
  )
}