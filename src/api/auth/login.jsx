import axios from "axios";

export const login = async (email, password) => {
     try {
          const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/login`, {
               email,
               password,
          });
          return res.data;
     } catch (error) {
          console.error("createTable: ", error.response.data);
          return error.response.data;
     }
};
