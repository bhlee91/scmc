import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios, { AxiosResponse } from 'axios';

type User = {
  email: string;
  nickname?: string;
  profile_image?: string;
  age?: string;
  gender?: string;
  id?: string;
  name?: string;
  birthday?: string;
  birthyear?: string;
  mobile: string;
}

const { naver } = window as any;

export default function NaverLogin() {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);

  const Keys = {
    CLIENT_ID: "_OKuc7UYmVLMPYx0UYhc",
    CLIENT_SECRET: "ky5YnBxks7"
  }

  const initNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: Keys.CLIENT_ID,
      callbackUrl: "http://localhost:3000/LogIn/nid",
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: '36' }
    })

     naverLogin.init();

    /*
    access_token=AAAANcN0KCTwJuhes2Hv6eNdsnm4zNIOaysRBBgPDnMgC85P_k9eyILOY82IcpeEcxRmcyPUbOTYu2appM0efBBdZnA
    state=cecb5f07-0c0a-4e99-8dc3-d07756bb24a6
    token_type=bearer
    expires_in=3600
    */
  }

  const location = useLocation();

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.substring("#access_token=".length, location.hash.lastIndexOf("&state="));

    if (token) {
      setToken(token);
      setIsLogin(true);
    }
  }

  useEffect(() => {
    if (isLogin) {
      const data = {
        token: token
      }

      axios.post(
        "http://localhost:8080/member/login/nid",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      ).then(res => {
        console.log(JSON.parse(res.data.data.res).response)
      }).catch(err => {
        console.log(data)
        console.log(err)
      });

      return;
    }

    initNaverLogin();
    getNaverToken();
  }, [isLogin])

  return (
    <div id="naverIdLogin">
    </div>
  )
}