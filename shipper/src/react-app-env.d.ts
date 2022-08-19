/// <reference types="react-scripts" />

// 이 부분에 사용할 변수의 타입을 지정해주면 
// 해당 변수의 자동 완성을 사용할 수 있습니다.

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_NAVER_CLIENT_ID: string;
    readonly REACT_APP_NAVER_CLIENT_SECRET: string;
    readonly REACT_APP_KAKAO_REST_API_KEY: string;
  }
}