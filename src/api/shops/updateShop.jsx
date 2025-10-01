import { instance } from "../interseptors";

export const updateShop = async (shopId, name, description) => {
     try {
          const res = await instance.patch(`shops/${shopId}`, {
               name: name,
               description: description,
          });
          return res.data;
     } catch (error) {
          console.log(error.response.data);
          return error.response.data;
     }
};
