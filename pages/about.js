import { useState , useEffect } from 'react'
import Layout from "../layouts/Layout";
import { getUser } from "../utils/apiKey";

function About(){
   const [user , setUser ] = useState([]);
   useEffect(() => {
      getUser().then((user) => setUser(user));
   }, [])
   return (
      <Layout>
      <div>
         {user.map(user => <div>{user.name}</div>)}
      </div>
   </Layout>
   )
}

export default  About