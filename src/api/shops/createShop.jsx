import { instance } from "../interseptors";

export const createShop = async (name, description) => {
     try {
          const res = await instance.post("shops", {
               name: name,
               description: description,
          });
          return res.data;
     } catch (error) {
          console.log(error.response.data);
          return error.response.data;
     }
};
