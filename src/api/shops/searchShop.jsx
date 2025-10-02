import { instance } from "../interseptors";

export const searchShop = async (keyword = "", page = 1, limit = 10, order = "desc") => {
     try {
          const res = await instance.get(`shops/search`, {
               params: {
                    keyword,
                    page,
                    limit,
                    order,
               },
          });

          return res.data;
     } catch (error) {
          console.log(error.response.data);
          return error.response.data;
     }
};
