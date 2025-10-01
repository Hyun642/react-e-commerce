import { instance } from "../interseptors";

export const deleteShop = async (shopId) => {
     try {
          const res = await instance.delete(`shops/${shopId}`);
          return res.data;
     } catch (error) {
          console.log(error.response.data);
          return error.response.data;
     }
};
