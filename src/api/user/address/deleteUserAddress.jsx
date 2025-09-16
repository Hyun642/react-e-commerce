import { instance } from "../../interseptors";

export const deleteUserAddress = async (userAddressId) => {
     try {
          const res = await instance.delete(`/users/address/${userAddressId}`);
          return res.data;
     } catch (error) {
          console.error("deleteUserAddress: ", error.response.data);
          return error.response.data;
     }
};
