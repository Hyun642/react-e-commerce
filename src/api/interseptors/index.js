import axios from "axios";

function setInterceptor() {
     const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

     api.interceptors.request.use(async (config) => {
          const token = localStorage.getItem("accessToken");
          if (token) {
               config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
     });

     api.interceptors.response.use(
          async function (res) {
               return res;
          },
          async function (err) {
               if (err.status === 401) {
                    alert("잘못된 접근입니다.(acess token 만료) 로그인 페이지로 이동");
                    localStorage.removeItem("accessToken");
                    window.location.href = "/login";
               }
               return Promise.reject(err);
          }
     );
     return api;
}

export const instance = setInterceptor();
