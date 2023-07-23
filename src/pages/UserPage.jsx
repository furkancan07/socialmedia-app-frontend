import React from 'react'
import { Link } from 'react-router-dom'



const UserPage = ({name,girisYapildimi}) => {
  return (
    <div>
      {
         girisYapildimi ? 
         name
         : <Link to='/login'>Giris Yapmadiniz giris yap</Link>
      }
    </div>
    
  )
}

export default UserPage
