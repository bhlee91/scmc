import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { useAppDispatch } from '../store';
import userSlice from '../slice/user';

export default function NaverLogin() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.hash) return;
    const token = location.hash.substring("#access_token=".length, location.hash.lastIndexOf("&state="));
    
    axios.post("http://localhost:8080/member/login/social",
    {
      token: token,
      social: "naver"
    })
    .then(res => {
      console.log(JSON.parse(res.data.data.res).response)

      const PROFILE = JSON.parse(res.data.data.res).response

      dispatch(
        userSlice.actions.setUser({
          email: PROFILE.email,
          phoneNumber: PROFILE.mobile,
          userName: PROFILE.name,
          accessToken: token,
          socialInfo: 'naver'
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