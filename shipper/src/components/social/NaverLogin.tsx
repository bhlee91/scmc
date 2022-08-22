import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { useAppDispatch } from '../../store';
import userSlice from '../../slice/user';
import tokenSlice from '../../slice/token';

export default function NaverLogin() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.hash) return;
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
  })

  return (
    <div>네이버 로그인...</div>
  )
}