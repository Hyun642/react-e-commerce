import { instance } from "../interseptors";

export const createProduct = async (productToAdd) => {
     const { shopId, name, description, price, thumbnailImageUrl, image, option } = productToAdd;
     try {
          const res = await instance.post(`products/${shopId}`, {
               name,
               description,
               price,
               thumbnailImageUrl,
               image,
               option,
          });
          return res.data;
     } catch (error) {
          console.log(error.response.data);
          return error.response.data;
     }
};
