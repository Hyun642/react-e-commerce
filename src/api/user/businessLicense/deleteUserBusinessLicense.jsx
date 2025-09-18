import { instance } from "../../interseptors";

export const deleteUserBusinessLicense = async (licenseId) => {
     try {
          const res = await instance.delete(`users/business-licenses/${licenseId}`);
          return res.data;
     } catch (error) {
          console.log("deleteUserBusinessLicense: ", error.response.data);
          return error.response.data;
     }
};
