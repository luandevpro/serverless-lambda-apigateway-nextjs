import axios from "axios"

export const getUser = async () => {
   const { data } = await axios.get("/api/users");
   return data;
}