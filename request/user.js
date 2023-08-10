import axios from "axios";

export const saveCart = async (cart,id) => {
  try {
    const { data } = await axios.post("/api/user/savecart", {
      cart,
      id
    });
    return data;
  } catch (error) {
    return response.data.error.message;
  }
};

export const saveAddress = async (address) => {
  try {
    const { data } = await axios.post("/api/user/saveAddress", {
      address,
     
    });
   

    
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const changeActiveAddress = async (id) => {
  try {
    const { data } = await axios.put("/api/user/manageaddress", {
      id,
    });

    return data;
  } catch (error) {
    return error.response.data.message;
  }
};