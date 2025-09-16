import { instance } from "../../interseptors";

export const getUserAddress = async (name, address) => {
     try {
          const res = await instance.get(`/users/address`);
          return res.data;
     } catch (error) {
          console.error("createTable: ", error.response.data);
          return error.response.data;
     }
};
