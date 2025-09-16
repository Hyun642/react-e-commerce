import { instance } from "../interseptors";

export const createUserAddress = async (name, address) => {
     try {
          const res = await instance.post(`/users/address`, {
               name,
               address,
          });
          return res.data;
     } catch (error) {
          console.error("createTable: ", error.response.data);
          return error.response.data;
     }
};
