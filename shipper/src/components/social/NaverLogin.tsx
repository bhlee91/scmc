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
    console.log(HASH_VALUES)
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
      console.log(JSON.parse(res.data.data.res).response)

      const PROFILE = JSON.parse(res.data.data.res).response

      dispatch(
        userSlice.actions.SET_LOGIN({
          email: PROFILE.email,
          phoneNumber: PROFILE.mobile,
          userName: PROFILE.name,
          socialInfo: "NAVER"
        })
      )

      navigate("/");
    })
    .catch(err => {
      console.log(err)
      navigate("/LogIn");
    });
  })

  return (
    <div>네이버 로그인...</div>
  )
}