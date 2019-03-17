import React from 'react'
import Link from "next/link"

export default ({children}) => (
   <div>
      <ul>
         <li><Link href="/"><a>Home</a></Link></li>
         <li><Link href="/about"><a>About</a></Link></li>
         <li><Link href="/post"><a>Post</a></Link></li>
      </ul>
      {children}
   </div>
)
