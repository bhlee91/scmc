FROM node:latest as builder
# 작업 폴더를 만들고 npm 설치
RUN mkdir /home/ubuntu/workspace/scmc/shipper/app

WORKDIR /home/ubuntu/workspace/scmc/shipper/app
ENV PATH /home/ubuntu/workspace/scmc/shipper/app/node_modules/.bin:$PATH
COPY package.json /home/ubuntu/workspace/scmc/shipper/app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# 소스를 작업폴더로 복사하고 빌드
COPY . /home/ubuntu/workspace/scmc/shipper/app
RUN npm run build

# nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
FROM nginx
FROM nginx:latest
# nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
COPY --from=builder /home/ubuntu/workspace/scmc/shipper/app/build /usr/share/nginx/html

# 80포트 오픈하고 nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]