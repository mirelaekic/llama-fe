import axios from "axios";

const backend = axios.create({
  baseURL:process.env.REACT_APP_LLAMA_API,
  withCredentials: true,
});

backend.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if ((error.response.status === 401 ||error.response.status === 403)  && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("refreshing the token...");
      return backend
        .post("/users/refreshToken")
        .then((res) => {
          if (res.status === 200) {
            console.log("token is refreshed");
            return backend(originalRequest);
          }
        })
        .catch(() => {
          window.location.replace("/login");
          return Promise.reject(error);
        });
    }
  }
);

export default backend;