import { instance } from "../../interseptors";

export const updateUserAddress = async (addressId, name, address) => {
     try {
          const res = await instance.get(`/users/address/${addressId}`, {
               data: {
                    name: name,
                    address: address,
               },
          });
          return res.data;
     } catch (error) {
          console.error("getUserAddress: ", error.response.data);
          return error.response.data;
     }
};
