import { instance } from "../interseptors";

export const getMyShopList = async () => {
     try {
          const res = await instance.get("shops/me/shops");
          return res.data;
     } catch (error) {
          console.log(error.response.data);
          return error.response.data;
     }
};
