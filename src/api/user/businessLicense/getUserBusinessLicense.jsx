import { instance } from "../../interseptors";

export const getUserBusinessLicenses = async () => {
     try {
          const res = await instance.get("users/business-licenses");
          return res.data;
     } catch (error) {
          console.log("getUserBusinessLicense: ", error.response.data);
          return error.response.data;
     }
};
