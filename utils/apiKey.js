import axios from "axios"

const headers = {
   "x-api-key": "Iii3clVkBa7qxPVBDzV7B1Ym1L0c6k5TadiasAaO"
}
export const getUser = async () => {
   const { data } = await axios.get("/api/users" , {headers});
   return data;
}