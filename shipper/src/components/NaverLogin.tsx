import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const { naver } = window as any;

export default function NaverLogin()  {
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
  }

  const location = useLocation();
  const navigate = useNavigate();

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.substring("#access_token=".length, location.hash.lastIndexOf("&state="));
    
    axios.post(
      "http://localhost:8080/member/login/nid",
      {
        token: token
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    ).then(res => {
      console.log(JSON.parse(res.data.data.res).response)
      navigate("/");
    }).catch(err => {
      console.log(err)
      navigate("/Login");
    });
  }

  useEffect(() => {
    initNaverLogin();
    getNaverToken();
  })

  return (
    <div id="naverIdLogin">
    </div>
  )
}