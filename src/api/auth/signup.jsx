import axios from "axios";

export const signup = async (name, email, password, phoneNumber) => {
     try {
          const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signup`, {
               name,
               email,
               password,
               phoneNumber,
          });
          return res;
     } catch (error) {
          console.error("signup: ", error.response.data);
          return error.response;
     }
};
