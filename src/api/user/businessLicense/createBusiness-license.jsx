import { instance } from "../../interseptors";

export const createBusinessLicense = async (businessId) => {
     try {
          const res = await instance.post("users/business-licenses", {
               businessId: businessId,
          });
          return res.data;
     } catch (error) {
          console.log(error.response.data);
          return error.response.data;
     }
};
